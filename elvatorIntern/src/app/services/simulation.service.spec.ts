import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ElevatorDirection } from '../simulator/helpers/elevator-direction';
import { Elevator } from '../simulator/models/elevator.model';
import { Simulation } from '../simulator/models/simulation.model';

import { SimulationService } from './simulation.service';
import { v4 as uuidv4 } from 'uuid';

describe('SimulationService', () => {
    let service: SimulationService;
    var store = {};

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SimulationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return empty list of simulations when storage is empty', fakeAsync(() => {
        spyOn(localStorage, 'getItem').and.returnValue("");

        service.getSimulations();
        let result;
        service.subscribeToAllSimulationsChanges().subscribe(x => result = x);
        tick();
        expect(result).toEqual([]);   
    }));

    it('should return updated simulation when update called', fakeAsync(() => {
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            return store[key] = value + '';
        });
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return store[key];
        });

        let mockSimulation = getMockSimualtions()[0];
        let updateSubject$ = service.subscribeToSimulationChanges();

        service.addSimulation(mockSimulation);
        tick();
        mockSimulation.elevators[0].floorsCount = 3;
        service.updateSimulation(mockSimulation.id, mockSimulation.elevators);
        tick();

        expect(updateSubject$.value.elevators[0].floorsCount).toEqual(3);
   
    }));

});


export function getMockSimualtions() {
    var simulation: Simulation = {id: uuidv4(), creationDate: new Date(), name: "sim1", elevators: getMockElevators()};
    return [simulation];
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