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
      await this.showToast('Login successful ✅', 'success');
      this.router.navigate(['/home']);
    } else {
      await this.showToast('Email or password incorrect ❌', 'danger');
    }
  }
  
  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }
  
}
