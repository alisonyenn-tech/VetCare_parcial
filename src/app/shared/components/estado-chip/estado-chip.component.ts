import { Component, Input } from '@angular/core';

import { EstadoCita } from '../../../core/models/cita.model';

/** Etiqueta de color con el estado de una cita: <app-estado-chip [estado]="cita.estado" /> */
@Component({
  selector: 'app-estado-chip',
  standalone: false,
  template: `
    <span class="chip" [ngClass]="estado | estadoCita: 'clase'">
      <mat-icon>{{ estado | estadoCita: 'icono' }}</mat-icon>
      {{ estado | estadoCita }}
    </span>
  `,
  styles: [
    `
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 12px 4px 8px;
        border-radius: 999px;
        font-size: 0.8rem;
        font-weight: 500;
        white-space: nowrap;
      }
      mat-icon {
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
      .estado-pendiente {
        background: #fff3d6;
        color: #8a5a00;
      }
      .estado-atendida {
        background: #dcf3e8;
        color: #0f6b4b;
      }
      .estado-cancelada {
        background: #eceff1;
        color: #55636b;
      }
    `,
  ],
})
export class EstadoChipComponent {
  @Input({ required: true }) estado!: EstadoCita;
}
