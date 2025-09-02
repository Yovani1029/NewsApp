import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/providers/http-news';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Article } from '../interfaces/article.interface';

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
  async doRefresh(event: any) {
    this.newsService.getRandomNews().subscribe({
      next: (data) => {
        this.news = data;
        event.target.complete(); 
      },
      error: () => {
        event.target.complete();
      }
    });
  }
  
  async logout() {
    await this.menuCtrl.close();

    localStorage.removeItem('loggedUser');
    localStorage.removeItem('otherData');

    const toast = await this.toastCtrl.create({
      message: 'You have been logged out ✅',
      duration: 2000,
      color: 'success'
    });
    await toast.present();

    this.router.navigate(['/login']);
  }
}
