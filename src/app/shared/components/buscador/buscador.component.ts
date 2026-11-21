import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buscador',
  standalone: false,
  styleUrls: ['./buscador.component.scss'],
  template: `
    <label class="form-label" [attr.for]="campoId">{{ etiqueta }}</label>
    <div class="input-group">
      <span class="input-group-text" aria-hidden="true"><span class="vet-icono" data-icono="search"></span></span>
      <input
        #campo
        [id]="campoId"
        class="form-control"
        type="search"
        [placeholder]="ejemplo"
        (input)="textoCambiado.emit(campo.value)"
      />
      <button
        class="btn btn-outline-success"
        type="button"
        [disabled]="!campo.value"
        (click)="campo.value = ''; textoCambiado.emit(''); campo.focus()"
      >
        Limpiar
      </button>
    </div>
  `,
})
export class BuscadorComponent {
  @Input({ required: true }) campoId!: string;
  @Input({ required: true }) etiqueta!: string;
  @Input() ejemplo = '';
  @Output() readonly textoCambiado = new EventEmitter<string>();
}
