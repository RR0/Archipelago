import {ILocation} from "database/rr0/model/event/circumstance/ILocation"
import {Length} from "database/rr0/util/Length"
import {Orientation} from "database/rr0/model/event/circumstance/Orientation"

export class DeltaLocation implements ILocation {

  constructor(readonly location: ILocation, readonly orientation: Orientation, readonly distance: Length) {
  }
}
