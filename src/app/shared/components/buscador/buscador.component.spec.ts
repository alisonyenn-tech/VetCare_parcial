import { TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared.module';
import { BuscadorComponent } from './buscador.component';

describe('BuscadorComponent', () => {
  it('emite el texto ingresado y una cadena vacía al limpiar', async () => {
    await TestBed.configureTestingModule({ imports: [SharedModule] }).compileComponents();
    const fixture = TestBed.createComponent(BuscadorComponent);
    fixture.componentRef.setInput('campoId', 'busqueda');
    fixture.componentRef.setInput('etiqueta', 'Buscar mascota');
    const emitir = spyOn(fixture.componentInstance.textoCambiado, 'emit');
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;
    const campo = root.querySelector('input')!;
    const limpiar = root.querySelector('button')!;
    expect(limpiar.disabled).toBeTrue();

    campo.value = 'Firulais';
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(emitir).toHaveBeenCalledWith('Firulais');

    limpiar.click();
    fixture.detectChanges();
    expect(emitir).toHaveBeenCalledWith('');
    expect(campo.value).toBe('');
    expect(limpiar.disabled).toBeTrue();
  });
});
