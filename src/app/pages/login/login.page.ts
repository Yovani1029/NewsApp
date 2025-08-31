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

  loginData: Login = { email: '', password: '' };

  constructor(
    private userService: UserService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit(): void { }

  get isFormValid(): boolean {
    return (
      this.loginData.email.trim().length > 0 &&
      this.isValidEmail(this.loginData.email) &&
      this.loginData.password.trim().length >= 6
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async login() {
    const user = this.userService.loginUser(this.loginData.email, this.loginData.password);

    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      const toast = await this.toastCtrl.create({
        message: 'Login successful ✅',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/home']);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Email or password incorrect ❌',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
