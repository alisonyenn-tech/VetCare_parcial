import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.nonNullable.group({
    usuario: ['', Validators.required],
    clave: ['', Validators.required],
  });

  ocultarClave = true;
  credencialesIncorrectas = false;

  ingresar(): void {
    this.credencialesIncorrectas = false;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { usuario, clave } = this.form.getRawValue();
    if (!this.auth.login(usuario, clave)) {
      this.credencialesIncorrectas = true;
      return;
    }

    // Solo se acepta una ruta interna de la app como destino de retorno.
    const destino = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigateByUrl(destino && destino.startsWith('/') ? destino : '/mascotas');
  }
}
