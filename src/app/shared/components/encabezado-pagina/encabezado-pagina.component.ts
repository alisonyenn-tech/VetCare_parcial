import { Component, Input } from '@angular/core';

/**
 * Título de página reutilizable. Lo que se escriba dentro de la etiqueta
 * aparece a la derecha (por ejemplo, un botón de acción):
 *
 *  <app-encabezado-pagina titulo="Mascotas" icono="pets">
 *    <a mat-flat-button>Nueva</a>
 *  </app-encabezado-pagina>
 */
@Component({
  selector: 'app-encabezado-pagina',
  standalone: false,
  template: `
    <header class="encabezado">
      <div class="titulos">
        <span class="icono-caja" *ngIf="icono" aria-hidden="true">
          <span *ngIf="icono === 'pets' || icono === 'event'; else iconoMaterial"
            class="vet-icono" [attr.data-icono]="icono"></span>
          <ng-template #iconoMaterial><mat-icon>{{ icono }}</mat-icon></ng-template>
        </span>
        <div>
          <h1>{{ titulo }}</h1>
          <p *ngIf="subtitulo">{{ subtitulo }}</p>
        </div>
      </div>
      <div class="acciones"><ng-content></ng-content></div>
    </header>
  `,
  styles: [
    `
      .encabezado {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        
        margin-bottom: 26px;
        padding: clamp(20px, 4vw, 38px);
        border: 1px solid #cce5de;
        border-radius: 24px;
        background: radial-gradient(ellipse at 100% 0%, #c5ebdd, transparent 55%),
          linear-gradient(120deg, #e0f3ef, #f9fffd);
        box-shadow: 0 8px 24px rgb(25 79 67 / 6%);
      }
      .titulos {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .icono-caja {
        display: grid;
        place-items: center;
        flex: 0 0 54px;
        width: 54px;
        height: 54px;
        border-radius: 14px;
        background: var(--verde);
        color: #fff;
      }
      .vet-icono {
        width: 46px;
        height: 46px;
      }
      h1 {
        margin: 0;
        font-size: clamp(1.45rem, 3vw, 2.25rem);
        font-weight: 700;
        letter-spacing: -0.035em;
        line-height: 1.2;
      }
      p {
        margin: 2px 0 0;
        color: var(--texto-suave);
        font-size: 0.9rem;
      }
      .acciones {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class EncabezadoPaginaComponent {
  @Input({ required: true }) titulo!: string;
  @Input() subtitulo = '';
  @Input() icono = '';
}
