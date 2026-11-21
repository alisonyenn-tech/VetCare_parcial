import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, SharedModule],
  // El calendario de Angular Material se muestra en español (Perú).
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-PE' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
