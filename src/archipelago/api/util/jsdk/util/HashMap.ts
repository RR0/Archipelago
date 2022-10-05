import {JEntriesIterator, JMap} from "archipelago/api/util/jsdk/util/JMap"

export class HashMap<K = any, V = any> implements JMap<K, V> {
  readonly _map = new Map<K, V>()

  entries(): JEntriesIterator<K, V> {
    return new JEntriesIterator<K, V>(this._map.entries())
  }

  get(key: K): V {
    return this._map.get(key) as V
  }

  put(key: K, value: V): V | undefined {
    const existing = this._map.get(key)
    this._map.set(key, value)
    return existing
  }
}
