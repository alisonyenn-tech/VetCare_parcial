import { aFecha } from '../utils/fechas';

export type EstadoCita = 'pendiente' | 'atendida' | 'cancelada';

/** Datos "planos" de una cita (lo que se guarda en localStorage). */
export interface DatosCita {
  id: number;
  mascotaId: number;
  fecha: string; // formato AAAA-MM-DD
  hora: string; // formato HH:mm
  motivo: string;
  estado: EstadoCita;
  diagnostico?: string;
  tratamiento?: string;
}

export interface Horario {
  hora: string;
  ocupada: boolean;
  pasada: boolean;
}

/**
 * Una cita es inmutable: para cambiarla (cancelar, atender) se crea una cita nueva
 * con el cambio aplicado. Así evitamos modificar datos por accidente.
 */
export class Cita {
  constructor(
    readonly id: number,
    readonly mascotaId: number,
    readonly fecha: string,
    readonly hora: string,
    readonly motivo: string,
    readonly estado: EstadoCita = 'pendiente',
    readonly diagnostico?: string,
    readonly tratamiento?: string,
  ) {}

  static desde(datos: DatosCita): Cita {
    return new Cita(
      datos.id,
      datos.mascotaId,
      datos.fecha,
      datos.hora,
      datos.motivo,
      datos.estado,
      datos.diagnostico,
      datos.tratamiento,
    );
  }

  get fechaHora(): Date {
    return aFecha(this.fecha, this.hora);
  }

  get estaPendiente(): boolean {
    return this.estado === 'pendiente';
  }

  get estaAtendida(): boolean {
    return this.estado === 'atendida';
  }

  /** Horas que faltan para la cita (negativo si ya pasó). */
  horasFaltantes(ahora: number = Date.now()): number {
    return (this.fechaHora.getTime() - ahora) / 3_600_000;
  }

  /** Una cita pendiente es "próxima" si ocurre dentro del límite de horas indicado. */
  esProxima(horasLimite = 24, ahora: number = Date.now()): boolean {
    if (!this.estaPendiente) {
      return false;
    }
    const horas = this.horasFaltantes(ahora);
    return horas >= 0 && horas <= horasLimite;
  }

  /** Devuelve una cita cancelada (solo se pueden cancelar las pendientes). */
  cancelar(): Cita {
    return this.estaPendiente ? this.conEstado('cancelada') : this;
  }

  /** Devuelve una cita atendida con su diagnóstico y tratamiento. */
  atender(diagnostico: string, tratamiento: string): Cita {
    return this.estaPendiente ? this.conEstado('atendida', diagnostico, tratamiento) : this;
  }

  private conEstado(estado: EstadoCita, diagnostico?: string, tratamiento?: string): Cita {
    return new Cita(
      this.id,
      this.mascotaId,
      this.fecha,
      this.hora,
      this.motivo,
      estado,
      diagnostico ?? this.diagnostico,
      tratamiento ?? this.tratamiento,
    );
  }
}
