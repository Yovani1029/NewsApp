import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user/user.service';
import { ToastController } from '@ionic/angular';
import { Login } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  loginData: Login = {
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit(): void {}

  async login() {
    const valid = this.userService.login(this.loginData.email, this.loginData.password);

    if(valid) {
      const toast = await this.toastCtrl.create({
        message: 'Login exitoso ✅',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/home']);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Email o contraseña incorrectos ❌',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
