import { DatosDueno, Dueno } from './dueno.model';

export type Especie = 'perro' | 'gato' | 'ave' | 'conejo' | 'otro';

export const ESPECIES: readonly Especie[] = ['perro', 'gato', 'ave', 'conejo', 'otro'];

/** Datos "planos" de una mascota (lo que se guarda y lo que llena el formulario). */
export interface DatosMascota {
  id: number;
  nombre: string;
  especie: Especie;
  raza: string;
  fechaNacimiento: string; // formato AAAA-MM-DD
  dueno: DatosDueno;
}

export type DatosNuevaMascota = Omit<DatosMascota, 'id'>;

export class Mascota {
  constructor(
    readonly id: number,
    readonly nombre: string,
    readonly especie: Especie,
    readonly raza: string,
    readonly fechaNacimiento: string,
    readonly dueno: Dueno,
  ) {}

  /** Texto como "Perro · Labrador". */
  get descripcion(): string {
    const especie = this.especie.charAt(0).toUpperCase() + this.especie.slice(1);
    return `${especie} · ${this.raza}`;
  }

  /** Reconstruye una Mascota (con su Dueno) a partir de datos planos. */
  static desde(datos: DatosMascota): Mascota {
    return new Mascota(
      datos.id,
      datos.nombre,
      datos.especie,
      datos.raza,
      datos.fechaNacimiento,
      Dueno.desde(datos.dueno),
    );
  }
}
