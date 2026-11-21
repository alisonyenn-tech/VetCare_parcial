import { DatosCita } from '../models/cita.model';
import { DatosMascota } from '../models/mascota.model';
import { hoyISO, sumarDias } from '../utils/fechas';

/** Datos de ejemplo para que la app no arranque vacía la primera vez. */
export const MASCOTAS_SEMILLA: DatosMascota[] = [
  {
    id: 1,
    nombre: 'Firulais',
    especie: 'perro',
    raza: 'Labrador',
    fechaNacimiento: '2020-03-12',
    dueno: {
      nombre: 'María Torres Quispe',
      dni: '45821369',
      telefono: '987654321',
      email: 'maria.torres@example.com',
    },
  },
  {
    id: 2,
    nombre: 'Michi',
    especie: 'gato',
    raza: 'Siamés',
    fechaNacimiento: '2022-07-01',
    dueno: {
      nombre: 'Carlos Rojas Díaz',
      dni: '70215486',
      telefono: '912345678',
      email: 'carlos.rojas@example.com',
    },
  },
  {
    id: 3,
    nombre: 'Piolín',
    especie: 'ave',
    raza: 'Canario',
    fechaNacimiento: '2024-01-20',
    dueno: {
      nombre: 'Lucía Fernández Paz',
      dni: '72846153',
      telefono: '935551212',
      email: 'lucia.fernandez@example.com',
    },
  },
];

export function citasSemilla(): DatosCita[] {
  const hoy = hoyISO();
  return [
    {
      id: 1,
      mascotaId: 1,
      fecha: sumarDias(hoy, -30),
      hora: '10:00',
      motivo: 'Vacunación anual',
      estado: 'atendida',
      diagnostico: 'Mascota sana, peso adecuado.',
      tratamiento: 'Vacuna múltiple aplicada.',
    },
    {
      id: 2,
      mascotaId: 2,
      fecha: sumarDias(hoy, -10),
      hora: '15:30',
      motivo: 'Control de peso',
      estado: 'atendida',
      diagnostico: 'Ligero sobrepeso.',
      tratamiento: 'Cambio de alimento y control en un mes.',
    },
    {
      id: 3,
      mascotaId: 1,
      fecha: sumarDias(hoy, 1),
      hora: '10:00',
      motivo: 'Control después de la vacuna',
      estado: 'pendiente',
    },
    {
      id: 4,
      mascotaId: 3,
      fecha: sumarDias(hoy, 3),
      hora: '16:30',
      motivo: 'Revisión de plumaje',
      estado: 'pendiente',
    },
  ];
}
