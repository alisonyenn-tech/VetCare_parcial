import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AgendaComponent } from './agenda/agenda.component';
import { CitasRoutingModule } from './citas-routing.module';

@NgModule({
  declarations: [AgendaComponent],
  imports: [SharedModule, CitasRoutingModule],
})
export class CitasModule {}
