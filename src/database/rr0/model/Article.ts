import {Locale} from "ts-jsdk"

export interface Article {

  setText(text: string, locale: Locale): void

  getText(locale: Locale): string | undefined
}
