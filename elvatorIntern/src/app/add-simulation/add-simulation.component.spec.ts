import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimulationService } from '../services/simulation.service';
import { Simulation } from '../simulator/models/simulation.model';
import { AddSimulationComponent } from './add-simulation.component';
import { v4 as uuidv4 } from 'uuid';
import { Elevator } from '../simulator/models/elevator.model';
import { ElevatorDirection } from '../simulator/helpers/elevator-direction';

describe('AddSimulationComponent', () => {
    let component: AddSimulationComponent;
    let fixture: ComponentFixture<AddSimulationComponent>;
    let dialogRefSpy;
    let matSnackBarSpy;
    let simulationServiceSpy;
    
    beforeEach(async(() => {
        simulationServiceSpy = jasmine.createSpyObj('SimulationService', ['addSimulation']);
        matSnackBarSpy = jasmine.createSpyObj('MatSnackBar',['open']);
        dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
 
        TestBed.configureTestingModule({
        declarations: [ AddSimulationComponent ],
        providers: [ 
            {provide: SimulationService, useValue: simulationServiceSpy}, 
            {provide: MatDialogRef, useValue: dialogRefSpy}, 
            {provide: MatSnackBar, useValue: matSnackBarSpy},
             ReactiveFormsModule ],
        imports: [ ReactiveFormsModule,
          FormsModule, MatRadioModule]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AddSimulationComponent>>;
        TestBed.inject(SimulationService) as jasmine.SpyObj<SimulationService>;
        fixture = TestBed.createComponent(AddSimulationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should spies be initialized', () => {
        expect(simulationServiceSpy.addSimulation).toBeDefined();
        expect(dialogRefSpy.close).toBeDefined();
    })

    it('should call add simulation on createSimulation with proper data', () => {
        let mockElevator = getMockElevator();
        component.addedElevators = [mockElevator];
        component.simulationTitle = "title";
        component.createSimulation();

        expect(simulationServiceSpy.addSimulation).toHaveBeenCalled();
        expect(dialogRefSpy.close).toHaveBeenCalled();
    })

     it('should not call add simulation on createSimulation with invalid name', () => {
        let mockElevator = getMockElevator();
        component.addedElevators = [mockElevator];
        component.simulationTitle = "";
        debugger;
        component.createSimulation();
        expect(simulationServiceSpy.addSimulation).not.toHaveBeenCalled();
        expect(dialogRefSpy.close).not.toHaveBeenCalled();
    })

     it('should not call add simulation on createSimulation with empty elevators array', () => {
        let mockElevator = getMockElevator();
        component.addedElevators = [mockElevator];
        component.simulationTitle = "";
        component.createSimulation();

        expect(simulationServiceSpy.addSimulation).not.toHaveBeenCalled();
        expect(dialogRefSpy.close).not.toHaveBeenCalled();
    })


});


export function getMockElevator() {
    var elevator: Elevator = {
        currentDirection: ElevatorDirection.Up, 
        currentFloor: 1, 
        floorsCount: 10, 
        id: uuidv4(), 
        name: "fastElevator",
        simulationStep: 3,
        downList: [0],
        upList: [5,6],
    };

    return elevator;
}
