import { FormControl } from '@angular/forms';

import { aISO, sumarDias } from '../../core/utils/fechas';
import { fechaNoFutura, fechaNoPasada } from './fechas.validator';

describe('Validadores de fechas', () => {
  const hoy = aISO(new Date());

  it('fechaNoFutura rechaza fechas posteriores a hoy', () => {
    expect(fechaNoFutura(new FormControl(sumarDias(hoy, 1)))).toEqual({ fechaFutura: true });
    expect(fechaNoFutura(new FormControl(hoy))).toBeNull();
    expect(fechaNoFutura(new FormControl(sumarDias(hoy, -400)))).toBeNull();
  });

  it('fechaNoPasada rechaza fechas anteriores a hoy', () => {
    expect(fechaNoPasada(new FormControl(sumarDias(hoy, -1)))).toEqual({ fechaPasada: true });
    expect(fechaNoPasada(new FormControl(hoy))).toBeNull();
    expect(fechaNoPasada(new FormControl(sumarDias(hoy, 3)))).toBeNull();
  });

  it('ambos aceptan un campo vacío (lo controla Validators.required)', () => {
    expect(fechaNoFutura(new FormControl(''))).toBeNull();
    expect(fechaNoPasada(new FormControl(''))).toBeNull();
  });
});
