import { Directive, HostBinding, Input } from '@angular/core';

import { Cita } from '../../core/models/cita.model';

/**
 * Resalta (en amarillo, con borde naranja) una tarjeta cuando la cita está
 * pendiente y ocurre dentro de las próximas horas.
 *
 *  <mat-card [appResaltarProxima]="cita" [horasLimite]="24">
 */
@Directive({ selector: '[appResaltarProxima]', standalone: false })
export class ResaltarProximaDirective {
  @Input({ required: true }) appResaltarProxima!: Cita;
  @Input() horasLimite = 24;

  @HostBinding('class.cita-proxima')
  get esProxima(): boolean {
    return !!this.appResaltarProxima && this.appResaltarProxima.esProxima(this.horasLimite);
  }

  @HostBinding('attr.title')
  get titulo(): string | null {
    return this.esProxima ? `Cita próxima (dentro de las próximas ${this.horasLimite} horas)` : null;
  }
}
