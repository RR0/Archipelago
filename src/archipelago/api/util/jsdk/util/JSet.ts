export interface JSet<T = any> {

  _set: Set<T>

  isEmpty(): boolean

  add(item: T): void

  size(): number
}
