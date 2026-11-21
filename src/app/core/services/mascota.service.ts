import { Injectable } from '@angular/core';

import { MASCOTAS_SEMILLA } from '../data/semilla';
import { DatosMascota, DatosNuevaMascota, Mascota } from '../models/mascota.model';
import { Repositorio } from './repositorio';

@Injectable({ providedIn: 'root' })
export class MascotaService extends Repositorio<Mascota> {
  constructor() {
    super(
      'vet_mascotas',
      MASCOTAS_SEMILLA.map((datos) => Mascota.desde(datos)),
      (crudo) => Mascota.desde(crudo as DatosMascota),
    );
  }

  /** Registra una mascota nueva junto con los datos de su dueño. */
  registrar(datos: DatosNuevaMascota): Mascota {
    return this.guardar((id) => Mascota.desde({ ...datos, id }));
  }

  /** Busca por nombre de la mascota, nombre del dueño o DNI. */
  buscar(texto: string): Mascota[] {
    const t = texto.trim().toLowerCase();
    if (!t) {
      return this.listar();
    }
    return this.listar().filter((m) =>
      [m.nombre, m.dueno.nombre, m.dueno.dni].some((valor) => valor.toLowerCase().includes(t)),
    );
  }
}
