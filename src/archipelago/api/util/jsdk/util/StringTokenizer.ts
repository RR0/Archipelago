export class StringTokenizer {

  private tokens: string[] = []
  private currentIndex = 0

  constructor(str: string, delimiter = " ") {
    this.tokens = str.split(delimiter)
  }

  hasMoreTokens(): boolean {
    return this.currentIndex < this.tokens.length
  }

  nextToken(): string {
    if (this.hasMoreTokens()) {
      const token = this.tokens[this.currentIndex]
      this.currentIndex++
      return token
    } else {
      throw new Error("No more tokens")
    }
  }
}
