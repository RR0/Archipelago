/**
 * Utility class to format names.
 */
import {StringTokenizer} from "archipelago/api/util/jsdk/util/StringTokenizer"

export class NameHelper {
  /**
   * @param name A name.
   * @param separator A separator between returned letters (" " or ". " for example)
   * @return A concatenation of capital letters that summarize the name.
   */
  static toAcronym(name: string, separator = ""): string {
    let acronymBuffer = ""
    const nameTokenizer = new StringTokenizer(name)
    while (nameTokenizer.hasMoreTokens()) {
      const word = nameTokenizer.nextToken()
      acronymBuffer += word.charAt(0).toUpperCase() + separator
    }
    return acronymBuffer.toString()
  }

  public static getFullName(firstNames: string[], lastName: string) {
    let fullNameBuffer = ""
    const separator = ""
    for (let i = 0; i < firstNames.length; i++) {
      fullNameBuffer += separator + firstNames[i]
    }
    fullNameBuffer += lastName
    return fullNameBuffer
  }
}
