export class Locale {

  constructor(private _language: string, private _country: string, private _variant?: string) {
  }

  static getDefault(): Locale {
    const localeStr = Intl.DateTimeFormat().resolvedOptions().locale
    let localItes = localeStr.split("-")
    let vv = localItes[1].split("_")
    return new Locale(localItes[0], vv[0], vv[1])
  }

  getCountry(): string {
    return this._country
  }

  getLanguage(): string {
    return this._language
  }

  getVariant(): string | undefined {
    return this._variant
  }
}

export const FRENCH = new Locale("fr", "FR")
export const FRANCE = "FR"
export const UK = "UK"
export const US = "US"
