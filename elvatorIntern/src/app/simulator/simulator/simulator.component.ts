import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Simulation } from '../models/simulation.model';
import { DestroyService } from './../../services/destroy.service';
import { SimulationService } from './../../services/simulation.service';
import { ElevatorComponent } from './../elevator/elevator.component';
import { Elevator } from './../models/elevator.model';


@Component({
    selector: 'app-simulator',
    templateUrl: './simulator.component.html',
    styleUrls: ['./simulator.component.scss'],
    providers: [DestroyService],
})
export class SimulatorComponent implements OnInit {
    @ViewChildren("elevator") elevatorsHandle: QueryList<ElevatorComponent>
    
    public elevators: Array<Elevator>;
    private simulationId: string;
    
    public simulation$: Observable<Simulation>;

    constructor(private router: Router, private route: ActivatedRoute, private destroy$: DestroyService, private simulationService: SimulationService) { }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
            this.simulationId = params['id'];
            this.fetchSimulationData();
        })
    }

    private fetchSimulationData():void {
        this.simulationService.getSimulation(this.simulationId);
        this.simulation$ = this.simulationService.subscribeToSimulationChanges();
    }

    performSimulationStepOnAll() {
        this.elevatorsHandle.forEach(elevator => elevator.performSimulationStep());
    }

    saveSimulationState() {
        let elevators: Array<Elevator> = this.elevatorsHandle.map(elevator => elevator.getElevatorState());
        this.simulationService.updateSimulation(this.simulationId, elevators);
    }
    public navigateToMenu() {
        this.router.navigate(['/']);
    }
}