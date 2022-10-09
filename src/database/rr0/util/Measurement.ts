import {Unit} from "database/rr0/util/Unit"

export abstract class Measurement {

  protected constructor(readonly unit: Unit, readonly value: number) {
  }
}
