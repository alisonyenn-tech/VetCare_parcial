import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar />
    <main class="contenedor">
      <router-outlet />
    </main>
    <footer class="pie">Clínica Veterinaria · Proyecto Angular + TypeScript</footer>
  `,
  standalone: false,
})
export class AppComponent {}
