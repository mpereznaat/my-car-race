import { Car } from "./car.model";

export interface Race {
    competitors : Car[],
    laps : number,
    distance : number,
    status : string    // new // process // finished
}