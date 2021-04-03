import { SimulationService } from './../services/simulation.service';
import { Elevator } from './../simulator/models/elevator.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Simulation } from '../simulator/models/simulation.model';
import { v4 as uuidv4 } from 'uuid';
import { ElevatorDirection } from '../simulator/helpers/elevator-direction';
import { MatDialog } from '@angular/material/dialog';
import { AddSimulationComponent } from '../add-simulation/add-simulation.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

    constructor(private router: Router, public dialog: MatDialog, private simulationService: SimulationService) { }

    public simulations$: Observable<Array<Simulation>>;

    ngOnInit(): void {
        // Fetch initial data and set multicast subject
        this.simulationService.getSimulations();
        this.simulations$ = this.simulationService.subscribeToAllSimulationsChanges();
    }

    public navigateToSimulator(simulationId: string){
        this.router.navigate(["simulator", simulationId]);
    }


    public addSimulation() {
        this.dialog.open(AddSimulationComponent);
    }
    

    public loadSampleData() {
        this.simulationService.addSimulation(getMockSimualtion());
    }
}

export function getMockSimualtion() {
    var simulation: Simulation = {id: uuidv4(), creationDate: new Date(), name: "sim1", elevators: getMockElevators()};
    return simulation;
}

export function getMockElevators() {
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

    return [
        elevator, 
        {...elevator, floorCount: 14, id: uuidv4(), currentFloor: 4}, 
        {...elevator, floorCount: 6, id: uuidv4(), currentFloor: 2, downList: [], upList: [5]},
    ];
}