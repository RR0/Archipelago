import {Database} from "archipelago/api/model/Database"
import {DatabaseAdapter} from "archipelago/api/model/DatabaseAdapter"
import {MetaModel} from "archipelago/api/model/MetaModel"

/**
 *
 */
export class DatabaseImpl implements Database {

  constructor(protected name: string, protected adapter: DatabaseAdapter, protected enabled = true,
              readonly dataModel: MetaModel) {
  }

  getName(): string {
    return this.name
  }

  isEnabled(): boolean {
    return this.enabled
  }

  setName(name: string): void {
    this.name = name
  }

  setAdapter(adapter: DatabaseAdapter): void {
    this.adapter = adapter
  }

  getAdapter(): DatabaseAdapter {
    return this.adapter
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  toString(): string {
    return `${this.name} (${this.adapter})`
  }
}
