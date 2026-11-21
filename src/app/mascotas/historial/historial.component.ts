import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { CitaService } from '../../core/services/cita.service';
import { MascotaService } from '../../core/services/mascota.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  standalone: false,
})
export class HistorialComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly mascotaService = inject(MascotaService);
  private readonly citaService = inject(CitaService);
  private readonly snackBar = inject(MatSnackBar);

  private readonly mascotaId = Number(this.route.snapshot.paramMap.get('id'));

  readonly mascota = this.mascotaService.obtener(this.mascotaId);

  /** Citas de la mascota (más recientes primero) y sus totales. */
  readonly vista$ = this.citaService.items$.pipe(
    map((citas) => {
      const lista = this.citaService.citasDeMascota(this.mascotaId, citas);
      return {
        lista,
        total: lista.length,
        atendidas: lista.filter((c) => c.estaAtendida).length,
        pendientes: lista.filter((c) => c.estaPendiente).length,
      };
    }),
  );

  /** Id de la cita para la que se está registrando la atención (null = ninguna). */
  atendiendoId: number | null = null;

  readonly formAtencion = this.fb.nonNullable.group({
    diagnostico: ['', [Validators.required, Validators.minLength(5)]],
    tratamiento: ['', [Validators.required, Validators.minLength(5)]],
  });

  iniciarAtencion(citaId: number): void {
    this.formAtencion.reset();
    this.atendiendoId = citaId;
  }

  cerrarAtencion(): void {
    this.atendiendoId = null;
  }

  guardarAtencion(): void {
    if (this.formAtencion.invalid || this.atendiendoId === null) {
      this.formAtencion.markAllAsTouched();
      return;
    }
    const { diagnostico, tratamiento } = this.formAtencion.getRawValue();
    this.citaService.registrarAtencion(this.atendiendoId, diagnostico, tratamiento);
    this.atendiendoId = null;
    this.snackBar.open('Atención registrada en el historial.', 'OK', { duration: 4000 });
  }
}
