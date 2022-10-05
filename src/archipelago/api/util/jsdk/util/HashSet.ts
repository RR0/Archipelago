import {JSet} from "archipelago/api/util/jsdk/util/JSet"

export class HashSet<T = any> implements JSet<T> {

  readonly _set = new Set<T>()

  isEmpty(): boolean {
    return this._set.size <= 0
  }

  add(item: T): void {
    this._set.add(item)
  }

  size(): number {
    return this._set.size
  }

  values(): IterableIterator<T> {
    return this._set.values()
  }

  addAll(set: JSet<T>): void {
    for (const s of set._set) {
      this.add(s)
    }
  }
}
