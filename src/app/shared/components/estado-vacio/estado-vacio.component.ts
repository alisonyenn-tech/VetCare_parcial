import { Component, Input } from '@angular/core';

/** Mensaje amigable cuando no hay datos que mostrar. Admite un botón dentro de la etiqueta. */
@Component({
  selector: 'app-estado-vacio',
  standalone: false,
  template: `
    <div class="vacio">
      <mat-icon>{{ icono }}</mat-icon>
      <h3>{{ titulo }}</h3>
      <p>{{ mensaje }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .vacio {
        text-align: center;
        padding: 40px 16px;
        border: 2px dashed #c9dcd2;
        border-radius: 16px;
        background: #fbfdfc;
      }
      mat-icon {
        width: 56px;
        height: 56px;
        font-size: 56px;
        color: #9fc7b5;
      }
      h3 {
        margin: 8px 0 4px;
        font-weight: 600;
      }
      p {
        margin: 0 0 16px;
        color: var(--texto-suave);
      }
    `,
  ],
})
export class EstadoVacioComponent {
  @Input() icono = 'pets';
  @Input({ required: true }) titulo!: string;
  @Input() mensaje = '';
}
