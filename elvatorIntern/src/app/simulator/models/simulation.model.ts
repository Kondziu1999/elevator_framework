import { Elevator } from "./elevator.model";

export class Simulation {
    public id: string;
    public name: string;
    public creationDate: Date; 
    public elevators: Array<Elevator>;
}