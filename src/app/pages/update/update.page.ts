import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user/user.service';
import { CountryService } from 'src/app/shared/service/country/country.service';
import { Country } from 'src/app/interfaces/country.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: false
})
export class UpdatePage implements OnInit {
  user: any = {
    id: '',
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
  ) {}

  ngOnInit() {
    const loggedUser = this.userService.getLoggedUser();
    if (loggedUser) {
      this.user = { ...loggedUser };
      this.user.password = ''; // limpiamos el campo para que ingrese nueva contraseña si quiere
    }

    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        if (this.user.country) {
          this.selectedCountry = this.countries.find(c => c.id === this.user.country) || null;
        }
      },
      error: (err) => console.error('Error cargando países', err)
    });
  }

  openCountryModal() { this.showModal = true; }
  closeModal() { this.showModal = false; }
  selectCountry(c: Country) {
    this.selectedCountry = c;
    this.user.country = c.id;
    this.closeModal();
  }

  showPassword = false;

  private async showToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color });
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
      (this.user.password === '' || this.user.password.trim().length >= 6) &&
      this.user.country !== ''
    );
  }

  async update() {
    if (!this.isValidEmail(this.user.email)) {
      return this.showToast('Correo inválido ❌', 'danger');
    }

    let updatedUser = { ...this.user };
    if (this.user.password) {
      updatedUser.password = this.userService['encryptPassword'](this.user.password);
    } else {
      const loggedUser = this.userService.getLoggedUser();
      updatedUser.password = loggedUser?.password || '';
    }

    const success = this.userService.updateUser(updatedUser);
    if (success) {
      await this.showToast('Usuario actualizado ✅', 'success');
      this.router.navigate(['/home']);
    } else {
      await this.showToast('Error al actualizar ❌', 'danger');
    }
  }
}
