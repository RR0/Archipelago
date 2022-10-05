import {MetaObjectVisitor} from "archipelago/api/model/MetaObjectVisitor"
import {MetaDataSource} from "archipelago/api/model/MetaDataSource"
import {MetaModel} from "archipelago/api/model/MetaModel"
import {Properties} from "archipelago/api/util/jsdk/util/Properties"

/**
 *
 */
export interface DatabaseAdapter extends MetaObjectVisitor, MetaDataSource {

  close(): void

  getDataModel(): MetaModel

  setProperties(properties: Properties): void
}
