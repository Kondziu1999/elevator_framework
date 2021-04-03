import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
import { Elevator } from '../simulator/models/elevator.model';
import { SimulationService } from './../services/simulation.service';
import { Simulation } from './../simulator/models/simulation.model';

@Component({
    selector: 'app-add-simulation',
    templateUrl: './add-simulation.component.html',
    styleUrls: ['./add-simulation.component.scss']
})
export class AddSimulationComponent implements OnInit {
    form = this.fb.group({
         elevatorName: ['', [Validators.required, Validators.minLength(1)]],
         elevatorFloors: [5, [Validators.required, Validators.pattern(/(0$)|^([1-9][0-9]*$)/)]],
         startDirection: ['Up'],
         startFloor: [0, Validators.pattern(/(0$)|^([1-9][0-9]*$)/)]
    })

    addedElevators: Array<Elevator>;
    simulationTitle: string = "";

    constructor(
        public dialogRef: MatDialogRef<AddSimulationComponent>, 
        private fb: FormBuilder, 
        private simulationService: SimulationService,
        private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.addedElevators = new Array<Elevator>();
    }

    addElevator() {
        if(!this.form.valid || Number.parseInt(this.form.get('elevatorFloors').value) ==0 || 
            Number.parseInt(this.form.get('elevatorFloors').value) < Number.parseInt(this.form.get('startFloor').value)) {
            this._snackBar.open("please provide valid data for elevator", "ok");
            return;
        }
        if (this.addedElevators.length >= environment.simulationElevatorsLimit) {
            this._snackBar.open("maximum elevator number is 16!", "ok");
            return;
        }

        var elevator: Elevator = {
            currentDirection: this.form.get('startDirection').value,
            floorsCount: Number.parseInt(this.form.get('elevatorFloors').value),
            currentFloor: Number.parseInt(this.form.get('startFloor').value),
            name: this.form.get('elevatorName').value,
            id: uuidv4(),
            simulationStep: 0,
            downList: [],
            upList: []
        }

        this.addedElevators.push(elevator);
    }

    removeElevator(id: string){
        this.addedElevators = this.addedElevators.filter(x => x.id != id);
    }

    createSimulation() {
        if (!this.validateSimulation()) {
            return;
        }

        var simulation: Simulation = {
            creationDate: new Date(),
            elevators: this.addedElevators,
            id: uuidv4(),
            name: this.simulationTitle,
        };

        this.simulationService.addSimulation(simulation);
        this.dialogRef.close();
    }

    closeDialog() {
        this.dialogRef.close();
    }

    private validateSimulation() {
        let valid = this.addedElevators.length > 0 && this.simulationTitle.length > 0;
        if (!valid) {
            this._snackBar.open("please provide name for simulation and at least one elevator", "ok");
        }
        return valid;
    }

}
