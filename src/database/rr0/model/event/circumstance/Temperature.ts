import {Measurement} from "database/rr0/util/Measurement"
import {CelciusDegrees, FarenheightDegrees} from "database/rr0/util/Unit"

export type TemperatureUnit = CelciusDegrees | FarenheightDegrees

export class Temperature extends Measurement {

  constructor(unit: TemperatureUnit, value: number) {
    super(unit, value)
  }
}
