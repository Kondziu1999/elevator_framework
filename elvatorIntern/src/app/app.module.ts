import { SharedModule } from './shared/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddSimulationComponent } from './add-simulation/add-simulation.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AddSimulationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddSimulationComponent]
})
export class AppModule { }
