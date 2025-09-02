import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardNewsComponent } from './components/card-news/card-news/card-news.component';
import { CategoryMenuComponent } from './components/category-menu/category-menu/category-menu.component';
import { NewsListComponent } from './components/news-list/news-list/news-list.component';

@NgModule({
  declarations: [
    CategoryMenuComponent,
    CardNewsComponent,
    NewsListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CategoryMenuComponent,
    NewsListComponent,
    CardNewsComponent
  ]
})
export class SharedModule {}
