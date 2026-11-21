import { BehaviorSubject, Observable } from 'rxjs';

/** Todo lo que se guarda en un repositorio debe tener un id numérico. */
export interface Entidad {
  readonly id: number;
}

/** Contrato que cumple cualquier repositorio de la aplicación. */
export interface IRepositorio<T extends Entidad> {
  readonly items$: Observable<T[]>;
  listar(): T[];
  obtener(id: number): T | undefined;
  guardar(crear: (id: number) => T): T;
  actualizar(item: T): void;
  eliminar(id: number): void;
}

/**
 * Clase base abstracta que guarda una lista de elementos en localStorage.
 * Los servicios de mascotas y de citas heredan de ella (herencia + encapsulamiento)
 * y le indican cómo reconstruir sus objetos desde los datos guardados.
 */
export abstract class Repositorio<T extends Entidad> implements IRepositorio<T> {
  private readonly subject: BehaviorSubject<T[]>;
  readonly items$: Observable<T[]>;

  protected constructor(
    private readonly clave: string,
    semilla: T[],
    private readonly reconstruir: (crudo: unknown) => T,
  ) {
    const guardados = this.leer();
    const iniciales = guardados.length > 0 ? guardados : semilla;
    this.subject = new BehaviorSubject<T[]>(iniciales);
    this.items$ = this.subject.asObservable();
    if (guardados.length === 0 && semilla.length > 0) {
      this.persistir(semilla);
    }
  }

  listar(): T[] {
    return this.subject.value;
  }

  obtener(id: number): T | undefined {
    return this.listar().find((item) => item.id === id);
  }

  /** Crea un elemento nuevo: recibe una función que lo construye con el id asignado. */
  guardar(crear: (id: number) => T): T {
    const nuevo = crear(this.siguienteId());
    this.persistir([...this.listar(), nuevo]);
    return nuevo;
  }

  actualizar(item: T): void {
    this.persistir(this.listar().map((actual) => (actual.id === item.id ? item : actual)));
  }

  eliminar(id: number): void {
    this.persistir(this.listar().filter((item) => item.id !== id));
  }

  private siguienteId(): number {
    return this.listar().reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  private persistir(items: T[]): void {
    try {
      localStorage.setItem(this.clave, JSON.stringify(items));
    } catch {
      // Si el navegador bloquea localStorage, la app sigue funcionando en memoria.
    }
    this.subject.next(items);
  }

  private leer(): T[] {
    try {
      const crudo = localStorage.getItem(this.clave);
      return crudo ? (JSON.parse(crudo) as unknown[]).map((dato) => this.reconstruir(dato)) : [];
    } catch {
      return [];
    }
  }
}
