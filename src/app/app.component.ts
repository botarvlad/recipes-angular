import { Component } from '@angular/core';
import { Routes } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentRoute: string = Routes.recipes;

  onRouteChanged(routeTo: string) {
    this.currentRoute = routeTo;
  }
}
