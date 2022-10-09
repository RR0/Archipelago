import {Moment} from "database/rr0/model/event/circumstance/Moment"

export class PreciseMoment implements Moment {
  constructor(readonly year: number, readonly month: number, readonly dayOfMonth: number, readonly hour: number,
              readonly minutes: number) {

  }
}
