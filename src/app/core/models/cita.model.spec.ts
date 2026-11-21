import { aFecha } from '../utils/fechas';
import { Cita } from './cita.model';

describe('Cita (clase)', () => {
  const cita = new Cita(1, 10, '2026-11-20', '10:00', 'Vacuna');

  it('nace pendiente', () => {
    expect(cita.estaPendiente).toBeTrue();
    expect(cita.estaAtendida).toBeFalse();
  });

  it('es próxima solo si falta menos del límite de horas', () => {
    const seisHorasAntes = aFecha('2026-11-20', '04:00').getTime();
    const dosDiasAntes = aFecha('2026-11-18', '10:00').getTime();
    const unaHoraDespues = aFecha('2026-11-20', '11:00').getTime();

    expect(cita.esProxima(24, seisHorasAntes)).toBeTrue();
    expect(cita.esProxima(24, dosDiasAntes)).toBeFalse();
    expect(cita.esProxima(24, unaHoraDespues)).toBeFalse();
  });

  it('cancelar devuelve una cita nueva y no modifica la original (inmutable)', () => {
    const cancelada = cita.cancelar();

    expect(cancelada.estado).toBe('cancelada');
    expect(cita.estado).toBe('pendiente');
    expect(cancelada.esProxima(24, aFecha('2026-11-20', '04:00').getTime())).toBeFalse();
  });

  it('atender guarda diagnóstico y tratamiento', () => {
    const atendida = cita.atender('Sano', 'Ninguno');

    expect(atendida.estaAtendida).toBeTrue();
    expect(atendida.diagnostico).toBe('Sano');
    expect(atendida.tratamiento).toBe('Ninguno');
  });

  it('una cita ya atendida no se puede cancelar', () => {
    const atendida = cita.atender('Sano', 'Ninguno');
    expect(atendida.cancelar().estado).toBe('atendida');
  });
});
