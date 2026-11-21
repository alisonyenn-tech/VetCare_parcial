import { Pipe, PipeTransform } from '@angular/core';

import { EstadoCita } from '../../core/models/cita.model';

export type SalidaEstado = 'texto' | 'clase' | 'icono';

/**
 * Muestra el estado de una cita de tres formas:
 *  {{ cita.estado | estadoCita }}            -> "Pendiente"
 *  [ngClass]="cita.estado | estadoCita:'clase'" -> clase de color
 *  {{ cita.estado | estadoCita:'icono' }}    -> nombre del ícono de Material
 */
@Pipe({ name: 'estadoCita', standalone: false })
export class EstadoCitaPipe implements PipeTransform {
  private readonly etiquetas: Record<EstadoCita, string> = {
    pendiente: 'Pendiente',
    atendida: 'Atendida',
    cancelada: 'Cancelada',
  };

  private readonly clases: Record<EstadoCita, string> = {
    pendiente: 'estado-pendiente',
    atendida: 'estado-atendida',
    cancelada: 'estado-cancelada',
  };

  private readonly iconos: Record<EstadoCita, string> = {
    pendiente: 'schedule',
    atendida: 'check_circle',
    cancelada: 'cancel',
  };

  transform(estado: EstadoCita, salida: SalidaEstado = 'texto'): string {
    switch (salida) {
      case 'clase':
        return this.clases[estado];
      case 'icono':
        return this.iconos[estado];
      default:
        return this.etiquetas[estado];
    }
  }
}
