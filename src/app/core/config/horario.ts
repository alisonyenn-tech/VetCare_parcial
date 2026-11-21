import { dos } from '../utils/fechas';

/** Genera horarios cada 30 minutos entre dos horas (la hora final no se incluye). */
function generarHoras(inicio: number, fin: number): string[] {
  const horas: string[] = [];
  for (let h = inicio; h < fin; h++) {
    horas.push(`${dos(h)}:00`, `${dos(h)}:30`);
  }
  return horas;
}

/** La clínica atiende de 09:00 a 18:00, con citas de 30 minutos. */
export const HORAS_ATENCION: readonly string[] = generarHoras(9, 18);
