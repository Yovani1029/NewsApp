import { Component, OnInit } from '@angular/core';
import { Article, NewsService } from '../shared/providers/http-news';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  news: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadRandomNews();
  }

  loadRandomNews() {
    this.newsService.getRandomNews().subscribe(data => this.news = data);
  }

  loadCategory(cat: string) {
    this.newsService.getTopHeadlines(cat).subscribe(data => this.news = data);
  }
}
