import { Component, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent , RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{provide: LOCALE_ID, useValue: 'pt-br'}]
})
export class AppComponent {
  title = "app";
}
