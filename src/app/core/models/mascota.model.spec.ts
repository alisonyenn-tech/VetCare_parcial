import { Dueno } from './dueno.model';
import { Mascota } from './mascota.model';
import { Persona } from './persona.model';

describe('Mascota y Dueno (herencia)', () => {
  const mascota = Mascota.desde({
    id: 1,
    nombre: 'Firulais',
    especie: 'perro',
    raza: 'Labrador',
    fechaNacimiento: '2020-03-12',
    dueno: {
      nombre: 'María Torres Quispe',
      dni: '45821369',
      telefono: '987654321',
      email: 'maria@example.com',
    },
  });

  it('reconstruye el dueño como una instancia de Dueno (y de Persona)', () => {
    expect(mascota.dueno instanceof Dueno).toBeTrue();
    expect(mascota.dueno instanceof Persona).toBeTrue();
  });

  it('el dueño calcula sus iniciales y su etiqueta', () => {
    expect(mascota.dueno.iniciales).toBe('MT');
    expect(mascota.dueno.etiqueta).toBe('Dueño · DNI 45821369');
  });

  it('describe la especie y la raza', () => {
    expect(mascota.descripcion).toBe('Perro · Labrador');
  });
});
