import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-category-menu',
  template: `
    <ion-segment scrollable>
      <ion-segment-button *ngFor="let cat of categories" (click)="selectCategory(cat)">
        {{ cat | titlecase }}
      </ion-segment-button>
    </ion-segment>
  `
})
export class CategoryMenuComponent {
  categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(cat: string) {
    this.categorySelected.emit(cat);
  }
}
