import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Autenticación de demostración para el personal de la clínica.
 * En un sistema real, esto se reemplazaría por un backend con tokens.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly USUARIO = 'admin';
  private static readonly CLAVE = 'vet123';
  private static readonly CLAVE_SESION = 'vet_sesion';

  private readonly subject = new BehaviorSubject<string | null>(this.leerSesion());
  readonly usuario$ = this.subject.asObservable();

  estaAutenticado(): boolean {
    return this.subject.value !== null;
  }

  login(usuario: string, clave: string): boolean {
    const valido = usuario.trim() === AuthService.USUARIO && clave === AuthService.CLAVE;
    if (valido) {
      this.guardarSesion(AuthService.USUARIO);
      this.subject.next(AuthService.USUARIO);
    }
    return valido;
  }

  logout(): void {
    try {
      sessionStorage.removeItem(AuthService.CLAVE_SESION);
    } catch {
      // sin acceso a sessionStorage: solo se limpia el estado en memoria
    }
    this.subject.next(null);
  }

  private guardarSesion(usuario: string): void {
    try {
      sessionStorage.setItem(AuthService.CLAVE_SESION, usuario);
    } catch {
      // sin acceso a sessionStorage: la sesión dura mientras no se recargue la página
    }
  }

  private leerSesion(): string | null {
    try {
      return sessionStorage.getItem(AuthService.CLAVE_SESION);
    } catch {
      return null;
    }
  }
}
