import { environment } from './../../../environments/environment.prod';
import { Elevator } from './../models/elevator.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElevatorDirection } from '../helpers/elevator-direction';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent implements OnInit {

    @ViewChild('select') floorSelect: MatSelect;
    private _elevator: Elevator;
 
    @Input() set elevator(elevator: Elevator) {
        this._elevator = {...elevator};
        this.initializeElavatorData()
    }
    get elevator(){
        return this._elevator;
    }
    
    // Return copies to avoid problems with change detection 
    private _upList: Array<number>;
    get upList() {
        return [...this._upList] || [];
    }

    private _downList: Array<number>;
    get downList() {
        return [...this._downList] || [];
    }

    private _currentDirection: ElevatorDirection;
    get currentDirection() {
        return this._currentDirection;
    }
 
    private _currentFloor: number;
    get currentFloor() {
        return this._currentFloor;
    }
 
    private _simulationStep: number;
    get simulationStep() {
        return this._simulationStep;
    }

    public form = new FormControl();

    public floors: Array<number>;

    constructor(private _snackBar: MatSnackBar) { }


    ngOnInit(): void {

    }

    private initializeElavatorData() {
        this._simulationStep = this._elevator.simulationStep;
        this.floors = Array.from(Array(this.elevator.floorsCount).keys());
        this._downList = this._elevator.downList || new Array<number>();
        this._upList = this._elevator.upList || new Array<number>();
        this._currentDirection = this._elevator.currentDirection || ElevatorDirection.Up;
        this._currentFloor = this._elevator.currentFloor ?? 0;
    }

    public performSimulationStep(): void {
        let elevatorPickUps = Array.of(...(this.form?.value || []) ) ;
        this._downList = this.applyFloorsWithoutDuplicates(this._downList, elevatorPickUps.filter(x => x < this._currentFloor))
        this._upList = this.applyFloorsWithoutDuplicates(this._upList, elevatorPickUps.filter(x => x > this._currentFloor));

        if(!this.isStepFeasible()){
            return;
        }

        if (this.currentDirection == ElevatorDirection.Up) {
            // If elevator reached top picked floor and there are some lower floors to visit change direction
            this.moveElevatorUp()
        }

        else {
           this.moveElevatorDown();
        }

        this.resetForm();
        this._simulationStep += 1;    
    }

    public getElevatorState(): Elevator {
        let elevator: Elevator = {
            id: this.elevator.id,
            name: this.elevator.name,
            currentDirection: this.currentDirection,
            currentFloor: this.currentFloor,
            floorsCount: this.floors.length,
            simulationStep: this.simulationStep,
            downList: this.downList,
            upList: this._upList
        }

        return elevator;
    }
    
    private resetForm() {
        this.form.reset();
        this.floorSelect.writeValue(null);
    }

    private isStepFeasible(): boolean {
        let isFeasible =  this._downList.length > 0 || this._upList.length > 0;
        if (!isFeasible) {
            this._snackBar.open("cannot perform simulation step, check input data", "ok", {
            duration: environment.snackbarDuration,
            });
            return false;
        }
        return true;
    }

    private moveElevatorUp() {
         if (this._upList.length == 0 && this._downList.length > 0) {
                this._currentDirection = ElevatorDirection.Down
                this.moveElevatorDown();
                return;
            }

            this._currentFloor += 1;
            this._currentFloor == this._upList[0] && this._upList.splice(0,1);
    } 

    private moveElevatorDown() {
        if (this._downList.length == 0 && this._upList.length > 0) {
            this._currentDirection = ElevatorDirection.Up
            this.moveElevatorUp();
            return;
        }

        this._currentFloor -= 1;
        this._currentFloor == this._downList.slice(-1)[0] && this._downList.splice(-1,1);
    }

    private applyFloorsWithoutDuplicates(array: Array<number>, elementsToBeAdded: Array<number>): Array<number> {
        if (elementsToBeAdded.length < 1) {
            return array;
        }
        array.push(...elementsToBeAdded);
        array.sort((a,b) => a-b);
        // remove duplicates
        return Array.of(...new Set(array));
    }
    
}
