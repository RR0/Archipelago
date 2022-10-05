export class ResourceBundle {

  constructor(readonly name: string) {
  }

  static getBundle(name: string): ResourceBundle {
    return new ResourceBundle(name)
  }

  getString(_str: string): string {
    return ""
  }
}
