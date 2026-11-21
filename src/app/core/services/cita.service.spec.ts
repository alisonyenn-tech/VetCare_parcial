import { TestBed } from '@angular/core/testing';

import { hoyISO, sumarDias } from '../utils/fechas';
import { CitaService } from './cita.service';

describe('CitaService', () => {
  let service: CitaService;
  const fecha = sumarDias(hoyISO(), 5);

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitaService);
  });

  afterEach(() => localStorage.clear());

  it('agenda una cita pendiente y marca la hora como ocupada', () => {
    const cita = service.agendar({ mascotaId: 1, fecha, hora: '10:00', motivo: 'Control general' });

    expect(cita.estado).toBe('pendiente');
    expect(service.estaOcupado(fecha, '10:00')).toBeTrue();

    const horario = service.construirHorarios(fecha, service.listar()).find((h) => h.hora === '10:00');
    expect(horario?.ocupada).toBeTrue();
  });

  it('no permite agendar dos citas en el mismo horario', () => {
    service.agendar({ mascotaId: 1, fecha, hora: '11:00', motivo: 'Vacuna' });

    expect(() =>
      service.agendar({ mascotaId: 2, fecha, hora: '11:00', motivo: 'Control' }),
    ).toThrowError('Ese horario ya fue reservado. Elige otro.');
  });

  it('libera el horario al cancelar la cita', () => {
    const cita = service.agendar({ mascotaId: 1, fecha, hora: '12:00', motivo: 'Vacuna' });
    service.cancelar(cita.id);

    expect(service.obtener(cita.id)?.estado).toBe('cancelada');
    expect(service.estaOcupado(fecha, '12:00')).toBeFalse();
  });

  it('registra la atención y la deja en el historial de la mascota', () => {
    const cita = service.agendar({ mascotaId: 1, fecha, hora: '14:00', motivo: 'Revisión' });
    service.registrarAtencion(cita.id, 'Todo normal', 'Sin tratamiento');

    const historial = service.citasDeMascota(1);
    const atendida = historial.find((c) => c.id === cita.id);
    expect(atendida?.estado).toBe('atendida');
    expect(atendida?.diagnostico).toBe('Todo normal');
  });
});
