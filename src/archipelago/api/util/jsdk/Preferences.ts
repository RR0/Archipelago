export class Preferences {

  private readonly map = new Map<string, any>()

  static userNodeForPackage(_clazz: any): Preferences {
  }

  flush() {
  }

  get(key: string, defaultValue: string) {
    let value = this.map.get(key)
    if (!value) {
      value = defaultValue
    }
    return value
  }
}
