import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AvatarMascotaComponent } from './components/avatar-mascota/avatar-mascota.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { EncabezadoPaginaComponent } from './components/encabezado-pagina/encabezado-pagina.component';
import { EstadoChipComponent } from './components/estado-chip/estado-chip.component';
import { EstadoVacioComponent } from './components/estado-vacio/estado-vacio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TarjetaDatoComponent } from './components/tarjeta-dato/tarjeta-dato.component';
import { ResaltarProximaDirective } from './directives/resaltar-proxima.directive';
import { MaterialModule } from './material.module';
import { EdadMascotaPipe } from './pipes/edad-mascota.pipe';
import { EstadoCitaPipe } from './pipes/estado-cita.pipe';
import { FechaCortaPipe } from './pipes/fecha-corta.pipe';

const PIEZAS = [
  AvatarMascotaComponent,
  BuscadorComponent,
  EncabezadoPaginaComponent,
  EstadoChipComponent,
  EstadoVacioComponent,
  NavbarComponent,
  TarjetaDatoComponent,
  ResaltarProximaDirective,
  EstadoCitaPipe,
  FechaCortaPipe,
  EdadMascotaPipe,
];

@NgModule({
  declarations: PIEZAS,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
  exports: [...PIEZAS, CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
