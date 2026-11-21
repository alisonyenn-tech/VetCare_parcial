import { Pipe, PipeTransform } from '@angular/core';

import { aFecha } from '../../core/utils/fechas';

/** Convierte una fecha de nacimiento en una edad legible: "3 años 2 meses". */
@Pipe({ name: 'edadMascota', standalone: false })
export class EdadMascotaPipe implements PipeTransform {
  transform(fechaNacimiento: string): string {
    if (!fechaNacimiento) {
      return '';
    }
    const nacimiento = aFecha(fechaNacimiento);
    const hoy = new Date();

    let meses =
      (hoy.getFullYear() - nacimiento.getFullYear()) * 12 + (hoy.getMonth() - nacimiento.getMonth());
    if (hoy.getDate() < nacimiento.getDate()) {
      meses--;
    }
    if (meses < 1) {
      return 'Menos de 1 mes';
    }

    const anios = Math.floor(meses / 12);
    const resto = meses % 12;
    const partes: string[] = [];
    if (anios > 0) {
      partes.push(anios === 1 ? '1 año' : `${anios} años`);
    }
    if (resto > 0) {
      partes.push(resto === 1 ? '1 mes' : `${resto} meses`);
    }
    return partes.join(' ');
  }
}
