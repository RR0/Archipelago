export class ValuesIterator<T> {
  private currentIndex = 0

  constructor(private values: T[]) {
  }

  hasNext(): boolean {
    return this.currentIndex < this.values.length
  }

  next(): T {
    if (this.hasNext()) {
      let n = this.values[this.currentIndex]
      this.currentIndex++
      return n
    } else {
      throw new Error("No more items")
    }
  }
}
