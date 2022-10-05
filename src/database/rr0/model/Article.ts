import {Locale} from "archipelago/api/util/jsdk/util/Locale"

export interface Article {

  setText(text: string, locale: Locale): void

  getText(locale: Locale): string | undefined
}
