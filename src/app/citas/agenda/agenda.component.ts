import { Component, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, startWith } from 'rxjs';

import { CitaService } from '../../core/services/cita.service';
import { MascotaService } from '../../core/services/mascota.service';
import { aFecha, aISO, hoyISO } from '../../core/utils/fechas';
import { fechaNoPasada } from '../../shared/validators/fechas.validator';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  standalone: false,
})
export class AgendaComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  private readonly mascotaService = inject(MascotaService);
  private readonly citaService = inject(CitaService);

  @ViewChild(MatCalendar) private calendario?: MatCalendar<Date>;

  readonly minFecha = new Date();
  readonly mascotas$ = this.mascotaService.items$;

  readonly form = this.fb.nonNullable.group({
    fecha: [hoyISO(), [Validators.required, fechaNoPasada]],
    hora: ['', Validators.required],
    mascotaId: [0, Validators.min(1)],
    motivo: ['', [Validators.required, Validators.minLength(5)]],
  });

  /** Día marcado en el calendario. */
  fechaSeleccionada: Date = new Date();

  error = '';

  /** Días que ya tienen citas pendientes (el calendario les dibuja un punto). */
  private fechasConCitas = new Set<string>();

  readonly clasesDia: MatCalendarCellClassFunction<Date> = (fecha) =>
    this.fechasConCitas.has(aISO(fecha)) ? 'dia-con-citas' : '';

  /** Horas del día elegido, marcando cuáles ya están ocupadas. */
  readonly horarios$ = combineLatest([
    this.form.controls.fecha.valueChanges.pipe(startWith(this.form.controls.fecha.value)),
    this.citaService.items$,
  ]).pipe(map(([fecha, citas]) => this.citaService.construirHorarios(fecha, citas)));

  /** Citas pendientes ordenadas por fecha, con los datos de la mascota. */
  readonly proximas$ = combineLatest([this.citaService.items$, this.mascotaService.items$]).pipe(
    map(([citas, mascotas]) =>
      citas
        .filter((c) => c.estaPendiente)
        .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))
        .map((cita) => ({ cita, mascota: mascotas.find((m) => m.id === cita.mascotaId) })),
    ),
  );

  constructor() {
    // Si venimos desde la lista de mascotas, la mascota ya queda seleccionada.
    const idPreseleccionado = Number(this.route.snapshot.queryParamMap.get('mascotaId'));
    if (idPreseleccionado > 0) {
      this.form.controls.mascotaId.setValue(idPreseleccionado);
    }

    // Al cambiar de día, hay que volver a elegir la hora.
    this.form.controls.fecha.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.form.controls.hora.reset());

    // Cuando cambian las citas, se actualizan los puntos del calendario.
    this.citaService.items$.pipe(takeUntilDestroyed()).subscribe((citas) => {
      this.fechasConCitas = new Set(citas.filter((c) => c.estaPendiente).map((c) => c.fecha));
      this.calendario?.updateTodaysDate();
    });
  }

  elegirDia(dia: Date | null): void {
    if (dia) {
      this.fechaSeleccionada = dia;
      this.form.controls.fecha.setValue(aISO(dia));
    }
  }

  seleccionarHora(hora: string): void {
    this.form.controls.hora.setValue(hora);
  }

  agendar(): void {
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { fecha, hora, mascotaId, motivo } = this.form.getRawValue();
    try {
      this.citaService.agendar({ mascotaId, fecha, hora, motivo: motivo.trim() });
      this.snackBar.open(`Cita agendada para el ${aFecha(fecha).toLocaleDateString('es-PE')} a las ${hora}.`, 'OK', {
        duration: 5000,
      });
      this.form.controls.hora.reset();
      this.form.controls.motivo.reset();
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'No se pudo agendar la cita.';
    }
  }

  cancelar(id: number): void {
    if (confirm('¿Seguro que deseas cancelar esta cita?')) {
      this.citaService.cancelar(id);
      this.snackBar.open('La cita fue cancelada y el horario quedó libre.', 'OK', { duration: 4000 });
    }
  }
}
