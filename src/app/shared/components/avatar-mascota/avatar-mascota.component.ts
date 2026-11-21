import { Component, Input } from '@angular/core';

import { Especie } from '../../../core/models/mascota.model';

/** Círculo con el dibujo de la especie de la mascota: <app-avatar-mascota especie="perro" /> */
@Component({
  selector: 'app-avatar-mascota',
  standalone: false,
  template: `
    <span
      class="vet-icono vet-avatar"
      [attr.data-icono]="especie"
      [style.width.px]="tamano"
      [style.height.px]="tamano"
      aria-hidden="true"
    ></span>
  `,
})
export class AvatarMascotaComponent {
  @Input({ required: true }) especie!: Especie;
  @Input() tamano = 48;
}
