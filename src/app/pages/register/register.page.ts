import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user/user.service';
import { CountryService } from 'src/app/shared/service/country/country.service';
import { Country } from 'src/app/interfaces/country.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone : false
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
    private countryService: CountryService
  ) {}

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
    this.user.country = c.id; // guardamos solo el id
    this.closeModal();
  }

  register() {
    if (this.userService.register(this.user)) {
      alert('Usuario registrado con éxito ✅');
      this.router.navigate(['/login']);
    } else {
      alert('El correo ya está registrado ❌');
    }
  }
}
