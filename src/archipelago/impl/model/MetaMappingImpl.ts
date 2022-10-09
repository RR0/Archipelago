import {MetaMapping} from "archipelago/api/model/MetaMapping"
import {Database} from "archipelago/api/model/Database"
import {MetaModel} from "archipelago/api/model/MetaModel"
import {MetaModelImpl} from "archipelago/api/model/MetaModelImpl"
import {JSerializable} from "ts-jsdk"

/**
 */
export class MetaMappingImpl implements MetaMapping, JSerializable {

  private metaModel: MetaModel = new MetaModelImpl()
  private datasources = new Set<Database>()

  getMetaModel(): MetaModel {
    return this.metaModel
  }

  getDatasources(): Set<Database> {
    return this.datasources
  }

  setMetaModel(metaModel: MetaModel): void {
    this.metaModel = metaModel
  }

  setDatasources(datasources: Set<Database>): void {
    this.datasources = datasources
  }
}
