import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly usuario$ = this.auth.usuario$;

  readonly enlaces = [
    { ruta: '/mascotas', texto: 'Mascotas', icono: 'pets' },
    { ruta: '/citas', texto: 'Agenda', icono: 'event' },
  ];

  salir(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
