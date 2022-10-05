export class Properties extends Map<string, string> {

  getProperty(name: string): string {
    return this.get(name) as string
  }
}
