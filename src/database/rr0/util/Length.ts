import {Measurement} from "database/rr0/util/Measurement"
import {METERS, Unit} from "database/rr0/util/Unit"

export class Length extends Measurement {

  constructor(unit: Unit, value: number) {
    super(unit, value)
  }
}

export const UNKNOWN_LENGTH = new Length(METERS, -1)
