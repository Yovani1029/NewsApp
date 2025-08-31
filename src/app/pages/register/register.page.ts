import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user/user.service';
import { CountryService } from 'src/app/shared/service/country/country.service';
import { Country } from 'src/app/interfaces/country.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  user = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    country: ''
  };

  countries: Country[] = [];
  selectedCountry: Country | null = null;
  showModal = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private countryService: CountryService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.countryService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (err) => console.error('Error cargando países', err)
    });
  }

  openCountryModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  selectCountry(c: Country) {
    this.selectedCountry = c;
    this.user.country = c.id;
    this.closeModal();
  }

  private async showToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get isFormValid(): boolean {
  return (
    this.user.name.trim().length > 0 &&
    this.user.lastName.trim().length > 0 &&
    this.isValidEmail(this.user.email) &&
    this.user.password.trim().length >= 6 &&
    this.user.country !== ''
  );
}

async register() {
  if (!this.isValidEmail(this.user.email)) {
    const toast = await this.toastCtrl.create({
      message: 'Invalid email ❌',
      duration: 2000,
      color: 'danger'
    });
    return toast.present();
  }

  if (this.userService.register(this.user)) {
    const toast = await this.toastCtrl.create({
      message: 'User registered ✅',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
    this.router.navigate(['/login']);
  } else {
    const toast = await this.toastCtrl.create({
      message: 'Email already registered ❌',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
}


}
