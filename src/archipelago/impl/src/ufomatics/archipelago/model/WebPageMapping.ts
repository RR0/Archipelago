import {FieldMapping} from "archipelago/api/model/FieldMapping"
import {WebPageLocation} from "archipelago/api/model/WebPageLocation"

/**
 *
 */
export class WebPageMapping implements FieldMapping {

  retrieve(_url: URL, _pageLocation: WebPageLocation): void {
  }

  setGenericURL(_name: string): void {
  }
}
