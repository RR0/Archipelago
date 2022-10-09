import {Article} from "database/rr0/model/Article"
import {Source} from "database/rr0/model/report/Source"
import {Locale} from "ts-jsdk"

export class ArticleImpl implements Article {

  protected text = new Map<Locale, string>()

  constructor(protected author?: Source) {
  }

  getText(locale: Locale): string | undefined {
    return this.text.get(locale)
  }

  setText(text: string, locale: Locale): void {
    this.text.set(locale, text)
  }
}
