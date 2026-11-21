import { Injectable } from '@angular/core';

import { HORAS_ATENCION } from '../config/horario';
import { citasSemilla } from '../data/semilla';
import { Cita, DatosCita, Horario } from '../models/cita.model';
import { horaActual, hoyISO } from '../utils/fechas';
import { Repositorio } from './repositorio';

export interface DatosNuevaCita {
  mascotaId: number;
  fecha: string;
  hora: string;
  motivo: string;
}

@Injectable({ providedIn: 'root' })
export class CitaService extends Repositorio<Cita> {
  constructor() {
    super(
      'vet_citas',
      citasSemilla().map((datos) => Cita.desde(datos)),
      (crudo) => Cita.desde(crudo as DatosCita),
    );
  }

  /** Una hora está ocupada si ya existe una cita no cancelada en esa fecha y hora. */
  estaOcupado(fecha: string, hora: string): boolean {
    return this.listar().some(
      (c) => c.fecha === fecha && c.hora === hora && c.estado !== 'cancelada',
    );
  }

  agendar(datos: DatosNuevaCita): Cita {
    if (this.estaOcupado(datos.fecha, datos.hora)) {
      throw new Error('Ese horario ya fue reservado. Elige otro.');
    }
    return this.guardar(
      (id) => new Cita(id, datos.mascotaId, datos.fecha, datos.hora, datos.motivo),
    );
  }

  cancelar(id: number): void {
    const cita = this.obtener(id);
    if (cita) {
      this.actualizar(cita.cancelar());
    }
  }

  registrarAtencion(id: number, diagnostico: string, tratamiento: string): void {
    const cita = this.obtener(id);
    if (cita) {
      this.actualizar(cita.atender(diagnostico.trim(), tratamiento.trim()));
    }
  }

  /** Citas de una mascota, de la más reciente a la más antigua. */
  citasDeMascota(mascotaId: number, citas: Cita[] = this.listar()): Cita[] {
    return citas
      .filter((c) => c.mascotaId === mascotaId)
      .sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));
  }

  /** Lista las horas del día indicando cuáles están ocupadas o ya pasaron. */
  construirHorarios(fecha: string, citas: Cita[]): Horario[] {
    if (!fecha) {
      return [];
    }
    const hoy = hoyISO();
    const ahora = horaActual();
    return HORAS_ATENCION.map((hora) => ({
      hora,
      ocupada: citas.some((c) => c.fecha === fecha && c.hora === hora && c.estado !== 'cancelada'),
      pasada: fecha < hoy || (fecha === hoy && hora <= ahora),
    }));
  }
}
