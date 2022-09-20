import { Component } from '@angular/core';
import { Car } from './models/car.model';
import { Pilot } from './models/pilot.model';
import { Race } from './models/race.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-car-race';
  myRace : Race = {
    competitors : [],
    laps : 3,
    distance : 150,
    status : 'new'
  }

  constructor(){
    const PILOT_1 : Pilot = {
      id : 1,
      name : 'Mauricio',
      lastName : 'Pérez',
      country : 'México'
    }

    const PILOT_2 : Pilot = {
      id : 2,
      name : 'Juan',
      lastName : 'Urquiza',
      country : 'Colombia'
    }

    const PILOT_3 : Pilot = {
      id : 3,
      name : 'Daniel',
      lastName : 'Lozano',
      country : 'Argentina'
    }

    const PILOT_4 : Pilot = {
      id : 4,
      name : 'Michael',
      lastName : 'Smith',
      country : 'USA'
    }

    let auto1 : Car = this.createCar(10, 'Rojo', PILOT_1);
    let auto2 : Car = this.createCar(20, 'Verde', PILOT_2);
    let auto3 : Car = this.createCar(30, 'Negro', PILOT_3);
    let auto4 : Car = this.createCar(40, 'Amarillo', PILOT_4);
    let auto5 : Car = this.createCar(50, 'Naranja');
    
    this.myRace.competitors = [auto1, auto2, auto3, auto4];

    this.startRace(this.myRace);

    let winner : string;
    do {
      winner = this.showPodium(this.myRace);
    } while (this.myRace.status != 'finished');

    console.log(winner);
  }

  createCar(carNumber: number, color : string, pilot? : Pilot) : Car {
    return {
      carNumber : carNumber,
      color : color,
      traveled : 0,
      pilot : pilot,
      status : 'stopped',
      start() {
        this.status = 'moving'
      },
      stop() {
        this.status = 'stopped'
      },
    }
  }

  getRandomNumber() : number {
    return Math.round(Math.random() * (50-1) + 1);
  }

  startRace(race : Race) : void {
    if(race.status == 'new'){
      race.competitors.forEach( value => value.start() );
      race.status = 'process';
    }
  }

  updateRace(race : Race) : void {
    if(race.status == 'process'){
      const RACE_DISTANCE = race.distance * race.laps;
      let finishedCars = 0;

      race.competitors.forEach ( value => {
        value.move = () => {
          if(value.traveled >= RACE_DISTANCE) {
            finishedCars++;
            value.traveled += 50;
          } else {
            value.traveled += this.getRandomNumber();
          }
        }

        if(value.status == 'moving') {
          value.move();
        }
      });

      if(race.competitors.length == finishedCars){
        race.status = 'finished';
      }
    }
  }

  checkPositions(competitors : Car[]) : Car[]{
    return competitors.sort(((a : Car, b : Car) => b.traveled - a.traveled));
  }

  showPodium(race : Race) : string {
    this.updateRace(race);
    console.log(race.status);

    let podium : any[] = [];
    const ORDERLY_RACE : Car[] = this.checkPositions(race.competitors);
    ORDERLY_RACE.forEach( (value, index) => {
      let COMPETITOR : any = {
        position : index+1,
        country : value.pilot?.country,
        name : value.pilot?.name + ' ' + value.pilot?.lastName,
        carNumber : value.carNumber
      }

      podium.push(COMPETITOR);
    })
    
    console.table(podium);
    
    const { carNumber : winnerCar , pilot : winnerPilot } = ORDERLY_RACE[0];
    const WINNER : string = `
    El ganador es: 
    Nacionalidad: ${winnerPilot?.country}
    Piloto: ${winnerPilot?.name} ${winnerPilot?.lastName}
    Car: ${winnerCar}`;

    return WINNER;
  }

}
