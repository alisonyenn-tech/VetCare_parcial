import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HistorialComponent } from './historial/historial.component';
import { MascotaFormComponent } from './mascota-form/mascota-form.component';
import { MascotaListComponent } from './mascota-list/mascota-list.component';
import { MascotasRoutingModule } from './mascotas-routing.module';

@NgModule({
  declarations: [MascotaListComponent, MascotaFormComponent, HistorialComponent],
  imports: [SharedModule, MascotasRoutingModule],
})
export class MascotasModule {}
