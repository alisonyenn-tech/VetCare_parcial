/** Datos "planos" de una persona, tal como se guardan en localStorage. */
export interface DatosPersona {
  nombre: string;
  telefono: string;
  email: string;
}

/**
 * Clase abstracta: define lo que tienen en común todas las personas del sistema.
 * Las clases hijas (por ejemplo Dueno) deben indicar su propia etiqueta.
 */
export abstract class Persona {
  protected constructor(
    readonly nombre: string,
    readonly telefono: string,
    readonly email: string,
  ) {}

  /** Texto corto que describe el rol de la persona. */
  abstract get etiqueta(): string;

  /** Iniciales para mostrar en un avatar: "María Torres" -> "MT". */
  get iniciales(): string {
    return this.nombre
      .split(' ')
      .filter((parte) => parte.length > 0)
      .slice(0, 2)
      .map((parte) => parte[0].toUpperCase())
      .join('');
  }
}
