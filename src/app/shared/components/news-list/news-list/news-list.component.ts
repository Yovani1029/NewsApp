import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article.interface';
@Component({
  standalone: false,
  selector: 'app-news-list',
  template: `
    <ng-container *ngFor="let n of news">
      <app-card-news [article]="n"></app-card-news>
    </ng-container>
  `
})
export class NewsListComponent {
  @Input() news: Article[] = [];
}
