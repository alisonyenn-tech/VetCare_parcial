import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';

import { CitaService } from '../../core/services/cita.service';
import { MascotaService } from '../../core/services/mascota.service';

@Component({
  selector: 'app-mascota-list',
  templateUrl: './mascota-list.component.html',
  styleUrls: ['./mascota-list.component.scss'],
  standalone: false,
})
export class MascotaListComponent {
  private readonly mascotaService = inject(MascotaService);
  private readonly citaService = inject(CitaService);

  readonly busqueda = new FormControl('', { nonNullable: true });

  /** Mascotas que coinciden con lo escrito en el buscador. */
  readonly mascotas$ = combineLatest([
    this.mascotaService.items$,
    this.busqueda.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([mascotas, texto]) => {
      const t = texto.trim().toLowerCase();
      if (!t) {
        return mascotas;
      }
      return mascotas.filter((m) =>
        [m.nombre, m.dueno.nombre, m.dueno.dni].some((valor) => valor.toLowerCase().includes(t)),
      );
    }),
  );

  /** Números del resumen superior. */
  readonly resumen$ = combineLatest([this.mascotaService.items$, this.citaService.items$]).pipe(
    map(([mascotas, citas]) => ({
      mascotas: mascotas.length,
      pendientes: citas.filter((c) => c.estaPendiente).length,
      proximas: citas.filter((c) => c.esProxima(24)).length,
      atendidas: citas.filter((c) => c.estaAtendida).length,
    })),
  );
}
