import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ESPECIES, Especie } from '../../core/models/mascota.model';
import { MascotaService } from '../../core/services/mascota.service';
import { hoyISO } from '../../core/utils/fechas';
import { fechaNoFutura } from '../../shared/validators/fechas.validator';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.scss'],
  standalone: false,
})
export class MascotaFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly mascotaService = inject(MascotaService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly especies = ESPECIES;
  readonly hoy = hoyISO();

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    especie: new FormControl<Especie>('perro', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    raza: ['', Validators.required],
    fechaNacimiento: ['', [Validators.required, fechaNoFutura]],
    dueno: this.fb.nonNullable.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
    }),
  });

  /** Devuelve true si el campo de esa ruta tiene ese error (por ejemplo 'dueno.dni', 'pattern'). */
  tieneError(ruta: string, codigo: string): boolean {
    return !!this.form.get(ruta)?.hasError(codigo);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Revisa los campos marcados en rojo.', 'Entendido', { duration: 4000 });
      return;
    }

    const mascota = this.mascotaService.registrar(this.form.getRawValue());
    this.snackBar.open(`${mascota.nombre} fue registrada correctamente.`, 'OK', { duration: 4000 });
    this.router.navigate(['/mascotas']);
  }
}
