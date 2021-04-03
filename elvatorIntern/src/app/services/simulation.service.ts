import { Simulation } from './../simulator/models/simulation.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Elevator } from '../simulator/models/elevator.model';

@Injectable({
    providedIn: 'root'
})
export class SimulationService {
    private readonly simulationsKey: string = 'simulations';
    
    // Property to which user can subscribe and recieve latest updates
    // In order to use it just inject service as separate instance
    private simulationSubject = new BehaviorSubject<Simulation>(null);
    private simulationsSubject = new BehaviorSubject<Array<Simulation>>([]);
    
    constructor() { 

    }


    public addSimulation(simulation: Simulation):void {
        let simulations = this.retrieveSimulationsFromLocalStorage() || [];
        simulations.push(simulation);
        localStorage.removeItem(this.simulationsKey);
        localStorage.setItem(this.simulationsKey, JSON.stringify(simulations));
        this.simulationsSubject.next(simulations);
    }

    public getSimulations(): Observable<Array<Simulation>> {
        let simulations = this.retrieveSimulationsFromLocalStorage() || [];
        this.simulationsSubject.next(simulations);
        return simulateNetworkDelay(simulations);
    }
    
    public getSimulation(simulationId: string): Observable<Simulation> {
        let simulations = this.retrieveSimulationsFromLocalStorage();
        let simulation = simulations.filter(x => x.id == simulationId)[0];
        this.simulationSubject.next(simulation);
        return simulateNetworkDelay(simulation);
    }

    public updateSimulation(simulationId: string, updatedElevators: Array<Elevator>) {
        let simulations = this.retrieveSimulationsFromLocalStorage();
        let simulationIndex = simulations.findIndex(x => x.id == simulationId);
        simulations[simulationIndex].elevators = updatedElevators;

        this.simulationSubject.next(simulations[simulationIndex]);
        localStorage.removeItem(this.simulationsKey);
        localStorage.setItem(this.simulationsKey, JSON.stringify(simulations));
    }

    public subscribeToSimulationChanges() {
        return this.simulationSubject;
    }

    public subscribeToAllSimulationsChanges() {
        return this.simulationsSubject;
    }


    private retrieveSimulationsFromLocalStorage():Array<Simulation> {
        let simulations: Array<Simulation>;
        try{
            simulations = JSON.parse(localStorage.getItem(this.simulationsKey));
        }
        catch(error){
            simulations = [];
        }
        return simulations;
    }
}

// Function for simulate network delay
export function simulateNetworkDelay<T>(data: T):Observable<T> {
    let observer = (observer) => {
        observer.next(data),
        observer.complete
    };

    return new Observable<T>(observer).pipe(delay(200));
}

