import { DatosPersona, Persona } from './persona.model';

export interface DatosDueno extends DatosPersona {
  dni: string;
}

/** El dueño de una mascota: es una Persona que además tiene DNI. */
export class Dueno extends Persona {
  constructor(
    nombre: string,
    telefono: string,
    email: string,
    readonly dni: string,
  ) {
    super(nombre, telefono, email);
  }

  get etiqueta(): string {
    return `Dueño · DNI ${this.dni}`;
  }

  static desde(datos: DatosDueno): Dueno {
    return new Dueno(datos.nombre, datos.telefono, datos.email, datos.dni);
  }
}
