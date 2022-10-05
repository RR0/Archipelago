import {Locale, UK, US} from "archipelago/api/util/jsdk/util/Locale"

/**
 * Utility class to convert lengths.
 */
export class LengthHelper {

  /**
   * The length of a UK/US foot
   */
  private static readonly FOOT_LENGTH = 0.3048

  /**
   * @param value A length value, in feet
   * @return The distance value, in meters
   */
  public static toMeters(value: number): number {
    return value * LengthHelper.FOOT_LENGTH
  }

  /**
   * @param value A length value, in meters.
   * @return The distance value, in feet
   */
  public static toFeet(value: number): number {
    return value / LengthHelper.FOOT_LENGTH
  }

  /**
   * @param value
   * @param locale The desired locale
   * @return The distance value, according to the locale
   */
  getValue(value: number, locale: Locale): number {
    let converted: number
    if (locale.getCountry() === UK || locale.getCountry() === US) {
      converted = LengthHelper.toFeet(value)
    } else {
      converted = LengthHelper.toMeters(value)
    }
    return converted
  }
}
