import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistorialComponent } from './historial/historial.component';
import { MascotaFormComponent } from './mascota-form/mascota-form.component';
import { MascotaListComponent } from './mascota-list/mascota-list.component';

const routes: Routes = [
  { path: '', component: MascotaListComponent },
  { path: 'nueva', component: MascotaFormComponent },
  { path: ':id/historial', component: HistorialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotasRoutingModule {}
