export class JIterableIterator<T> {
  constructor(private iterator: IterableIterator<T>) {
  }

  hasNext(): boolean {
    return !this.iterator.next().done
  }

  next(): T {
    if (this.hasNext()) {
      return this.iterator.next().value
    } else {
      throw new Error("No more items")
    }
  }
}
