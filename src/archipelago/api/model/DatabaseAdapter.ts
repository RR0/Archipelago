import {MetaObjectVisitor} from "archipelago/api/model/MetaObjectVisitor"
import {MetaDataSource} from "archipelago/api/model/MetaDataSource"
import {MetaModel} from "archipelago/api/model/MetaModel"
import {Properties} from "ts-jsdk"

/**
 *
 */
export interface DatabaseAdapter extends MetaObjectVisitor, MetaDataSource {

  close(): void

  readonly dataModel: MetaModel

  setProperties(properties: Properties): void
}
