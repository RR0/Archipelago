import {IdentityImpl} from "archipelago/impl/model/IdentityImpl"
import {Identity} from "archipelago/api/model/Identity"
import {Source} from "database/rr0/model/report/Source"
import {Case} from "database/rr0/model/report/Case"
import {HumanBeing} from "database/rr0/model/actor/HumanBeing"
import {Organization} from "database/rr0/model/actor/Organization"
import {AbstractFunction} from "database/rr0/model/evaluation/AbstractFunction"
import {PreciseMoment} from "database/rr0/model/event/circumstance/PreciseMomentImpl"
import {EarthLocation} from "database/rr0/model/event/circumstance/EarthLocation"
import {Orientation} from "database/rr0/model/event/circumstance/Orientation"
import {Place} from "database/rr0/model/event/circumstance/Place"
import {DeltaLocation} from "database/rr0/model/event/circumstance/DeltaLocation"
import {UNKNOWN_LENGTH} from "database/rr0/util/Length"
import {Clouds} from "database/rr0/model/event/circumstance/Clouds"
import {Temperature} from "database/rr0/model/event/circumstance/Temperature"
import {CelciusDegrees} from "database/rr0/util/Unit"
import {Wind} from "database/rr0/model/event/circumstance/Wind"
import {Precipitations} from "database/rr0/model/event/circumstance/Precipitations"
import {WeatherCondition} from "database/rr0/model/event/circumstance/WeatherCondition"
import {Category} from "database/rr0/model/evaluation/classification/Category"
import {Sighting} from "database/rr0/model/event/Sighting"

/**
 * A test for describing the Roswell case using the RR0 Information Model.
 */
describe("Report", () => {

  // The case in itself
  const roswellCase = new Case("The Roswell Incident")

  // Case's actors
  const brazelIdentity: Identity = new IdentityImpl("William W. Brazel")
  const brazel = new HumanBeing(brazelIdentity)
  const usafIdentity: Identity = new IdentityImpl("United States Air Force")
  const usaf = new Organization(usafIdentity)
  console.log(usaf)

  // First case's event : deflagration
  const firstDeflagrationMoment = new PreciseMoment(1947, 7, 2, 21, 50)
  const roswellCityLocation = new EarthLocation(43, Orientation.NORTH, 142, Orientation.WEST)
  const roswellCity = new Place("Roswell", roswellCityLocation)
  const ranchLocation = new DeltaLocation(roswellCity.location, Orientation.NORTH_WEST, UNKNOWN_LENGTH)
  const brazelRanch: Place = new Place("Brazel's ranch", ranchLocation)
  const firstDeflagrationClouds = new Clouds(0)
  const firstDeflagrationTemperature = new Temperature(CelciusDegrees, 15)
  const firstDeflagrationWind = new Wind(10)
  const windCategory = AbstractFunction.getFunction("ViolentWind") as Category
  console.log(windCategory)
  const firstDeflagrationPrecipitations = new Precipitations(0)
  const weatherCondition = new WeatherCondition(firstDeflagrationClouds, firstDeflagrationTemperature,
    firstDeflagrationWind, firstDeflagrationPrecipitations)
  console.log(weatherCondition)

  const source: Source | undefined = undefined
  const firstDeflagration = new Sighting("Brazel heards a deflagration", firstDeflagrationMoment, brazelRanch,
    brazel, source)
  roswellCase.accounts.push(firstDeflagration)

  // Second case's event : Mac brazel
})
