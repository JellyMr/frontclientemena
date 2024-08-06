import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Client';
}