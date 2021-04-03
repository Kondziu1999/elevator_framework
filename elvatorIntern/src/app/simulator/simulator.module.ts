import { VarDirective } from './helpers/ng-var.directive';
import { SharedModule } from './../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator/simulator.component';
import { SimulatorRoutingModule } from './simulator-routing.module';
import { ElevatorComponent } from './elevator/elevator.component';



@NgModule({
  declarations: [SimulatorComponent, ElevatorComponent, VarDirective],
  imports: [
    CommonModule,
    SimulatorRoutingModule,
    SharedModule
  ]
})
export class SimulatorModule { }
