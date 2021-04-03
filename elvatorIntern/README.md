# ElevatorIntern
Project created as intern recruitment task. 
Elevator algorith works as follows:

## Algorithm
Algorithm has two lists for each direciton.
Elevator move in one direction(Up/Down) till there is no floors in given direction to visit.
If elevator visited all floors in given direction it changes direction to opposite.
If direciton lists are empty nothing happens, only snackbar info.
Elevator visit all the floors along the way.
Simulation step: 1 floor

## Technical info
Framework: Angular 10,
Language: Typescript
Others: Angular Material, uuidv4, RxJs

Simulations are cashed in local store for simlicity. Network delay is simulated.
Solution is spilited into lazy loaded modules.
Most template data is provided by observable streams
Core logic is covered by test.

Sample data is provided, on dahboard click => load sample data

## To run
npm install
ng serve

ng test

Enjoy !
