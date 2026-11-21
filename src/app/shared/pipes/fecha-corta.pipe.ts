import { Pipe, PipeTransform } from '@angular/core';

import { aFecha } from '../../core/utils/fechas';

/** Convierte "2026-11-20" en "vie, 20 nov" (y agrega la hora si se indica). */
@Pipe({ name: 'fechaCorta', standalone: false })
export class FechaCortaPipe implements PipeTransform {
  transform(fechaISO: string, hora?: string): string {
    if (!fechaISO) {
      return '';
    }
    const texto = aFecha(fechaISO).toLocaleDateString('es-PE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    return hora ? `${texto} · ${hora}` : texto;
  }
}
