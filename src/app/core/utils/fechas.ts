/** Agrega un cero a la izquierda: 5 -> "05". */
export function dos(n: number): string {
  return String(n).padStart(2, '0');
}

/** Convierte una fecha a texto AAAA-MM-DD usando la zona horaria local. */
export function aISO(fecha: Date): string {
  return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())}`;
}

export function hoyISO(): string {
  return aISO(new Date());
}

/** Convierte "AAAA-MM-DD" (y opcionalmente "HH:mm") en un Date local. */
export function aFecha(iso: string, hora = '00:00'): Date {
  const [anio, mes, dia] = iso.split('-').map(Number);
  const [h, min] = hora.split(':').map(Number);
  return new Date(anio, mes - 1, dia, h, min);
}

export function sumarDias(iso: string, dias: number): string {
  const f = aFecha(iso);
  f.setDate(f.getDate() + dias);
  return aISO(f);
}

/** Hora actual en formato HH:mm. */
export function horaActual(): string {
  const ahora = new Date();
  return `${dos(ahora.getHours())}:${dos(ahora.getMinutes())}`;
}
