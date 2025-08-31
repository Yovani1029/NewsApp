import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {

  constructor(private router: Router, private toastCtrl: ToastController) {}

  async logout() {
    // Limpiar toda la sesión
    localStorage.removeItem('loggedUser');  // elimina usuario logueado
    localStorage.removeItem('otherData');   // si guardas más datos, también limpiar aquí

    // Mostrar un mensaje
    const toast = await this.toastCtrl.create({
      message: 'You have been logged out ✅',
      duration: 2000,
      color: 'success'
    });
    toast.present();

    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
