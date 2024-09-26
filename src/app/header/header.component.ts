import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Routes } from '../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() currentRoute: string;
  @Output() route = new EventEmitter<string>();
  routes = Routes;

  routeTo(to: string) {
    this.route.emit(to);
  }
}
