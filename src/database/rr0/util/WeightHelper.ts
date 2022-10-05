import {Locale, UK, US} from "archipelago/api/util/jsdk/Locale"

/**
 * Utility class to convert weight values.
 */
export class WeightHelper {
  /**
   * The weight of a Pound, in kilograms.
   */
  public static readonly POUND_WEIGHT = 0.45359237

  public static getValue(value: number, locale: Locale): number {
    if (locale.getCountry() === UK || locale.getCountry() === US) {
      value = WeightHelper.toPounds(value)
    } else {
      value = WeightHelper.toKilograms(value)
    }
    return value
  }

  /**
   * @param value A weight value, in kilograms
   * @return The value, in Pounds.
   */
  static toPounds(value: number): number {
    return value / WeightHelper.POUND_WEIGHT
  }

  /**
   * @param value A weight value, in Pounds
   * @return The value, in kilograms.
   */
  static toKilograms(value: number): number {
    return value * WeightHelper.POUND_WEIGHT
  }
}
