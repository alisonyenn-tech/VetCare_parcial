import { Component, Input } from '@angular/core';

/** Tarjeta pequeña con un número y su etiqueta, para los resúmenes: <app-tarjeta-dato valor="5" etiqueta="Mascotas" /> */
@Component({
  selector: 'app-tarjeta-dato',
  standalone: false,
  template: `
    <div class="dato">
      <span class="icono" aria-hidden="true">
        <span *ngIf="ilustrado; else iconoMaterial" class="vet-icono" [attr.data-icono]="icono"></span>
        <ng-template #iconoMaterial><mat-icon>{{ icono }}</mat-icon></ng-template>
      </span>
      <div>
        <strong>{{ valor }}</strong>
        <span>{{ etiqueta }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .dato {
        display: flex;
        align-items: center;
        gap: 12px;
        height: 100%;
        min-height: 96px;
        padding: 15px;
        border: 1px solid #dce8e4;
        border-radius: 16px;
        background: #fff;
        box-shadow: 0 1px 3px rgba(15, 107, 75, 0.12);
      }
      .icono {
        display: grid;
        place-items: center;
        flex: 0 0 42px;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: var(--dato-fondo, var(--verde-claro));
        color: var(--dato-icono, var(--verde-oscuro));
      }
      .vet-icono {
        width: 38px;
        height: 38px;
      }
      strong {
        display: block;
        font-size: 1.8rem;
        font-weight: 700;
        line-height: 1.1;
      }
      div > span {
        color: var(--texto-suave);
        font-size: 0.8rem;
      }
    `,
  ],
})
export class TarjetaDatoComponent {
  @Input({ required: true }) valor!: string | number;
  @Input({ required: true }) etiqueta!: string;
  @Input() icono = 'insights';

  get ilustrado(): boolean {
    return ['pets', 'event', 'notifications_active', 'medical_services'].includes(this.icono);
  }
}
