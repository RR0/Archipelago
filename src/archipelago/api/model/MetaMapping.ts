import {MetaModel} from "archipelago/api/model/MetaModel"
import {Database} from "archipelago/api/model/Database"

/**
 *
 */
export interface MetaMapping {

  getMetaModel(): MetaModel

  getDatasources(): Set<Database>

  setMetaModel(metaModel: MetaModel): void
}
