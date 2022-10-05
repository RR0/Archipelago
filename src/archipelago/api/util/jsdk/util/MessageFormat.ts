export class MessageFormat {

  private readonly regex: RegExp

  constructor(pattern: string) {
    let regexPattern = ""
    let pos = 0
    do {
      const start = pattern.indexOf("{", pos)
      if (start >= 0) {
        regexPattern += pattern.substring(pos, start) // Raw text
        const end = pattern.indexOf("}", start)
        if (end) {
          regexPattern += ("(.+)")
        } else {
          throw Error("Unclosed MessageFormat pattern")
        }
        pos = end + 1
      } else {
        regexPattern += pattern.substring(pos) // Raw text
        pos = pattern.length
      }
    } while (pos < pattern.length)
    this.regex = new RegExp(regexPattern)
  }

  parse(text: string): boolean {
    return this.regex.test(text)
  }
}
