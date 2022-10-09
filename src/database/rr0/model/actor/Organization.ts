import {Actor} from "database/rr0/model/actor/Actor"
import {Identity} from "archipelago/api/model/Identity"

export class Organization implements Actor {

  constructor(readonly identity: Identity) {
  }
}
