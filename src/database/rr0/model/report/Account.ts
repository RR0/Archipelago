import {AbstractEvent} from "database/rr0/model/event/AbstractEvent"
import {Moment} from "database/rr0/model/event/circumstance/Moment"
import {Place} from "database/rr0/model/event/circumstance/Place"
import {Actor} from "database/rr0/model/actor/Actor"
import {Source} from "database/rr0/model/report/Source"

export abstract class Account extends AbstractEvent {

  constructor(what: string, when: Moment, where: Place, who: Actor, source?: Source) {
    super(what, when, where, who, source)
  }
}
