import { Component, OnInit } from '@angular/core';
import { Article, NewsService } from '../shared/providers/http-news';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  news: Article[] = [];

  constructor(
    private newsService: NewsService,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadRandomNews();
  }

  loadRandomNews() {
    this.newsService.getRandomNews().subscribe(data => this.news = data);
  }

  loadCategory(cat: string) {
    this.newsService.getTopHeadlines(cat).subscribe(data => this.news = data);
  }
  async logout() {
    // cerrar el menú primero
    await this.menuCtrl.close();

    // limpiar sesión
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('otherData');

    // mostrar mensaje
    const toast = await this.toastCtrl.create({
      message: 'You have been logged out ✅',
      duration: 2000,
      color: 'success'
    });
    await toast.present();

    // redirigir al login
    this.router.navigate(['/login']);
  }
}
