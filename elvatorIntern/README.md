# ElevatorIntern
Project created as intern recruitment task. 

## Algorithm
Every elevator has two lists- one for each direction.
User can add floors for elevator to visit by selecting them in dropdown list.
For each direction, algorithm checks if selected floor is above or below current positon of elevator.
If it's above then algorithm adds it to the "up" list, if it's below, algorithm adds it to the "down" list.
If postion matches the floor, the selection is ignored.

Elevator moves in one direction(Up/Down) until there is no floor in list corresponding to current direction of elevator.
When aforementioned list gets empty and there are any floors to visit in the second list, elevator changes its direciton to opposite. If both lists are empty elevator stops on the current floor.
While it's moving, elevator visits one floor in given direction per one step of simulation.

## Technical info
Framework: Angular 10,
Language: Typescript,
Others: Angular Material, uuidv4

Simulations are cashed in local storage for simplicity. Network delay is simulated.
Solution is spilited into lazy loaded modules.
Most template data is provided by observable streams.
Core logic is covered by tests.

## To run
npm install

ng serve

## Run tests
ng test

## Usage
After launching the application, open your browser and go to http://localhost:4200 (if you haven't specified other port in ng serve params). You can load a sample simulation by clicking "Load sample data" button. If you want to create your own simulation, press the purple floating button, fill the form by naming simulation and adding elevators(at least one). For each elevator you can specify how many floors it can reach, in which direction it should move at the beginning of simulation and on which floor it starts.
You can add up to 16 elevators per simulation.
In simulation you can perform a step for all of elevators, or for each one separately. For each elevator you can choose which floors should be visited by it. If an elevator doesn't have any floor to visit, you will get a snackbar with info about it, but despite that other elevators will be simulated properly.

