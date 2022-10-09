import {Moment} from "database/rr0/model/event/circumstance/Moment"
import {Place} from "database/rr0/model/event/circumstance/Place"
import {Actor} from "database/rr0/model/actor/Actor"
import {Source} from "database/rr0/model/report/Source"

export class AbstractEvent {

  constructor(
    readonly what: string,
    readonly when: Moment,
    readonly where: Place,
    readonly who: Actor,
    readonly source?: Source
  ) {
  }
}
