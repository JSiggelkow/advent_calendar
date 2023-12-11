import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header/header.component";
import {ScaffoldComponent} from "./calendar-scaffold/scaffold/scaffold.component";
import {TestCrudComponent} from "./test-crud/test-crud.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ScaffoldComponent, RouterLink, TestCrudComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
