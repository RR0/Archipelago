import {Actor} from "database/rr0/model/actor/Actor"
import {Identity} from "archipelago/api/model/Identity"

export class HumanBeing implements Actor {

  constructor(readonly identity: Identity) {
  }
}
