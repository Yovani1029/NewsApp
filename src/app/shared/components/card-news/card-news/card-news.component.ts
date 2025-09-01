import { Component, Input } from '@angular/core';
import { Article } from 'src/app/shared/providers/http-news';

@Component({
  standalone: false,
  selector: 'app-card-news',
  template: `
    <ion-card mode="ios" class="news-card">
      <img *ngIf="article.urlToImage" [src]="article.urlToImage" alt="news image" />

      <ion-card-header>
        <ion-card-title class="news-title">
          {{ article.title }}
        </ion-card-title>
        <ion-card-subtitle class="news-subtitle">
          {{ article.author || 'Unknown author' }}
        </ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <p class="news-description">
          {{ article.description }}
        </p>
        <p class="news-date">
          {{ article.publishedAt | date:'fullDate' }}
        </p>
        <a [href]="article.url" target="_blank" class="news-link">
          Read full article
        </a>
      </ion-card-content>
    </ion-card>
  `,
})
export class CardNewsComponent {
  @Input() article!: Article;
}
