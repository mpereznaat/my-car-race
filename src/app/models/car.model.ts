import { Pilot } from "./pilot.model";

export interface Car {
    carNumber : number,
    color : string,
    pilot? : Pilot,
    traveled : number,
    status : string,    // stopped // moving
    start() : void,
    move?() : void,
    stop() : void
}