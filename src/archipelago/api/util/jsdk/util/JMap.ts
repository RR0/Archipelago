import {JIterableIterator} from "archipelago/api/util/jsdk/util/JIterableIterator"

export interface JEntry<K = any, V = any> {
  getKey(): K

  getValue(): V
}

export class JEntriesIterator<K = any, V = any> extends JIterableIterator<JEntry<K, V>> {
  constructor(iterator: IterableIterator<[K, V]>) {
    super(iterator)
  }
}

export interface JMap<K = any, V = any> {

  entries(): JEntriesIterator<K, V>

  get(key: K): V

  put(key: K, value: V): V | undefined
}
