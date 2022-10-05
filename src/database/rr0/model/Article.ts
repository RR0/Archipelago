import {Locale} from "archipelago/api/util/jsdk/Locale"

export interface Article {

  setText(text: string, locale: Locale): void

  getText(locale: Locale): string | undefined
}
