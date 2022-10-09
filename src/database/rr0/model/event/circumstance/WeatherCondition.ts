import {Wind} from "database/rr0/model/event/circumstance/Wind"
import {Temperature} from "database/rr0/model/event/circumstance/Temperature"
import {Clouds} from "database/rr0/model/event/circumstance/Clouds"
import {Precipitations} from "database/rr0/model/event/circumstance/Precipitations"

export class WeatherCondition {

  constructor(
    readonly clouds: Clouds,
    readonly temperature: Temperature,
    readonly wind: Wind,
    readonly precipitations: Precipitations
  ) {
  }
}
