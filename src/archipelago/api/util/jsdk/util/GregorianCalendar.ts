import {Calendar} from "archipelago/api/util/jsdk/util/Calendar"
import {Locale} from "archipelago/api/util/jsdk/util/Locale"

export class GregorianCalendar extends Calendar {

  constructor(protected locale: Locale, time = new Date()) {
    super(time)
  }

  static getInstance(locale: Locale) {
    return new GregorianCalendar(locale)
  }
}
