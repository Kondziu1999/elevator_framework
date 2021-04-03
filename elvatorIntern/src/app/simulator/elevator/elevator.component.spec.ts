import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Elevator } from '../models/elevator.model';
import { v4 as uuidv4 } from 'uuid';
import { ElevatorComponent } from './elevator.component';
import { ElevatorDirection } from '../helpers/elevator-direction';
import { HarnessLoader } from '@angular/cdk/testing';

describe('ElevatorComponent', () => {
    let matSnackBarSpy = jasmine.createSpyObj('MatSnackBar',['open']);
    let component: ElevatorComponent;
    let fixture: ComponentFixture<ElevatorComponent>;
    let snackBar;
    let loader: HarnessLoader;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ ElevatorComponent ],
        providers: [{provide: MatSnackBar, useValue: matSnackBarSpy}]
        })
        .compileComponents();
    }));

    beforeEach(async () => {
        debugger;
        fixture = TestBed.createComponent(ElevatorComponent);
        snackBar = TestBed.inject(MatSnackBar);
        component = fixture.componentInstance;
        component.elevator = getMockedElevator();
        fixture.detectChanges();
        spyOn<any>(component, "resetForm").and.callFake(()=> {});
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should elevator data be initialized', () => {
        expect(component.simulationStep).not.toBe(null);
        expect(component.floors).not.toBe(null);
        expect(component.downList).not.toBe(null);
        expect(component.upList).not.toBe(null);
        expect(component.currentDirection).not.toBe(null);
        expect(component.currentFloor).not.toBe(null);
    })

    describe("elevator movement", () => {
        let elevator;
        let moveUpSpy;
        let moveDownSpy;
        beforeEach(() => {
            elevator = getMockedElevator();
            moveUpSpy = spyOn<any>(component, "moveElevatorUp").and.callThrough();
            moveDownSpy = spyOn<any>(component, "moveElevatorDown").and.callThrough();
        })

        it('should elevator move up', fakeAsync(() => {       
            component.elevator = {...elevator};
            tick();
            component.performSimulationStep();
            expect(moveUpSpy).toHaveBeenCalled();
            expect(component.currentFloor).toBe(elevator.currentFloor + 1);
        }));

        it('should elevator move down', fakeAsync(() => {       
            component.elevator = {...elevator, currentDirection: ElevatorDirection.Down};
            tick();
            component.performSimulationStep();
            expect(moveDownSpy).toHaveBeenCalled();
            expect(component.currentFloor).toBe(elevator.currentFloor - 1);
        }));

        it('should elevator change direction to Down', () => {
            component.elevator = {...elevator, upList:[], downList: [0,1]}
            component.performSimulationStep();
            expect(moveDownSpy).toHaveBeenCalled();
            expect(component.currentDirection).toEqual(ElevatorDirection.Down);
        })

        it('should elevator change direction to Up', () => {
            component.elevator = {...elevator,currentDirection: ElevatorDirection.Down, upList:[9], downList: []}
            component.performSimulationStep();
            expect(moveUpSpy).toHaveBeenCalled();
            expect(component.currentDirection).toEqual(ElevatorDirection.Up);
        })

        it('should elevator stay in place', () => {
            component.elevator = {...elevator, upList:[], downList: []}
            component.performSimulationStep();
            expect(moveUpSpy).not.toHaveBeenCalled();
            expect(moveDownSpy).not.toHaveBeenCalled();
        })

    })



});

export function getMockedElevator() {
    var elevator: Elevator = {
        currentDirection: ElevatorDirection.Up, 
        currentFloor: 5, 
        floorsCount: 20, 
        id: uuidv4(), 
        name: "fastElevator",
        simulationStep: 3,
        downList: [0],
        upList: [6,7,20],
    };

    return elevator;
}

