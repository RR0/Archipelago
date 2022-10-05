/**
 *
 */
import {Localizer} from "archipelago/api/util/Localizer"

export class LocalizerImpl implements Localizer {

  constructor(_args: string[]) {
  }

  public getText(key: string): string {
    return key
  }
}
