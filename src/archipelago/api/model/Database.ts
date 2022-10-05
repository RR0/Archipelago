import {MetaModel} from "archipelago/api/model/MetaModel"
import {MetaDataSource} from "archipelago/api/model/MetaDataSource"
import {DatabaseAdapter} from "archipelago/api/model/DatabaseAdapter"

/**
 *
 */
export interface Database extends MetaDataSource {

  getDataModel(): MetaModel

  isEnabled(): boolean

  setName(name: string): void

  setAdapter(adapter: DatabaseAdapter): void

  setEnabled(enabled: boolean): void

  getAdapter(): DatabaseAdapter
}
