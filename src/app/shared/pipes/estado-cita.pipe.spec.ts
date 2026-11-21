import { EstadoCitaPipe } from './estado-cita.pipe';

describe('EstadoCitaPipe', () => {
  const pipe = new EstadoCitaPipe();

  it('muestra el texto del estado', () => {
    expect(pipe.transform('pendiente')).toBe('Pendiente');
    expect(pipe.transform('atendida')).toBe('Atendida');
    expect(pipe.transform('cancelada')).toBe('Cancelada');
  });

  it('devuelve la clase de color según el estado', () => {
    expect(pipe.transform('pendiente', 'clase')).toBe('estado-pendiente');
    expect(pipe.transform('atendida', 'clase')).toBe('estado-atendida');
    expect(pipe.transform('cancelada', 'clase')).toBe('estado-cancelada');
  });

  it('devuelve el ícono según el estado', () => {
    expect(pipe.transform('pendiente', 'icono')).toBe('schedule');
    expect(pipe.transform('atendida', 'icono')).toBe('check_circle');
  });
});
