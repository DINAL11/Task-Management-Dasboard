import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskFlow - Project Management Dashboard';
}

// src/app/app.component.html
<div class="app-container">
  <nav class="navbar">
    <div class="nav-brand">
      <h2>TaskFlow</h2>
    </div>
    <div class="nav-links">
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/projects" routerLinkActive="active">Projects</a>
      <a routerLink="/teams" routerLinkActive="active">Teams</a>
    </div>
  </nav>
  
  <main class="main-content">
    <router-outlet></router-outlet>
  </main>
</div>
