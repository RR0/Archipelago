export class Locale {

  constructor(protected language: string, protected country: string) {
  }

  getCountry(): string {
    return this.country
  }

  static getDefault(): Locale {

  }
}

export const FRENCH = new Locale("fr", "FR")
export const FRANCE = "FR"
export const UK = "UK"
export const US = "US"
