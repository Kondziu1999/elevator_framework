import { ElevatorDirection } from "../helpers/elevator-direction";

export class Elevator {
    public id: string;
    public name: string;
    public floorsCount: number;
    public currentDirection: ElevatorDirection;
    public currentFloor: number;
    public simulationStep: number;
    public upList?: Array<number>;
    public downList?: Array<number>;
}