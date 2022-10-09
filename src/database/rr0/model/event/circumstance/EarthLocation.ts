import {Orientation} from "database/rr0/model/event/circumstance/Orientation"
import {ILocation} from "database/rr0/model/event/circumstance/ILocation"

export class EarthLocation implements ILocation {

  constructor(
    readonly latitude: number, readonly latitudeOrientation: Orientation,
    readonly longitude: number, readonly longitudeOrientation: Orientation
  ) {
  }
}
