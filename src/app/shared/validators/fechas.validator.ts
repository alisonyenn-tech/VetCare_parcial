import { AbstractControl, ValidationErrors } from '@angular/forms';

import { hoyISO } from '../../core/utils/fechas';

/** La fecha no puede ser posterior a hoy (ej. fecha de nacimiento). */
export function fechaNoFutura(control: AbstractControl): ValidationErrors | null {
  const valor = control.value as string | null;
  if (!valor) {
    return null;
  }
  return valor > hoyISO() ? { fechaFutura: true } : null;
}

/** La fecha no puede ser anterior a hoy (ej. agendar una cita). */
export function fechaNoPasada(control: AbstractControl): ValidationErrors | null {
  const valor = control.value as string | null;
  if (!valor) {
    return null;
  }
  return valor < hoyISO() ? { fechaPasada: true } : null;
}
