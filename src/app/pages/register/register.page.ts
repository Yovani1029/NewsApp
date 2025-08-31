import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/service/user/user.service';

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
    country: { id: '', value: '' }
  };

  countries: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  // 📌 Consumir API de países con banderas
  loadCountries() {
    this.http.get<any>('https://countriesnow.space/api/v0.1/countries/flag/images')
      .subscribe({
        next: (res) => {
          this.countries = res.data.map((c: any) => ({
            id: c.name,
            value: `${c.flag} ${c.name}`
          }));
        },
        error: (err) => {
          console.error('Error cargando países', err);
        }
      });
  }

  // 📌 Registrar usuario
  register() {
    if (this.userService.register(this.user)) {
      alert('Usuario registrado con éxito ✅');
      this.router.navigate(['/login']);
    } else {
      alert('El correo ya está registrado ❌');
    }
  }
}
