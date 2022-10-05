import {DatabaseAdapter} from "archipelago/api/model/DatabaseAdapter"
import {Properties} from "archipelago/api/util/jsdk/util/Properties"
import {MetaObject} from "archipelago/api/model/MetaObject"
import {MetaObjectImpl} from "archipelago/api/model/MetaObjectImpl"
import {MetaModel} from "archipelago/api/model/MetaModel"

/**
 *
 */
export abstract class AbstractDatabaseAdapter implements DatabaseAdapter {

  private properties: Properties = new Properties()

  abstract getName(): string

  abstract close(): void

  abstract getDataModel(): MetaModel

  getProperties(): Properties {
    return this.properties
  }

  setProperties(properties: Properties): void {
    this.properties = properties
    try {
      this.init(properties)
    } catch (e) {
      console.error(e)
    }
  }

  visit(original: MetaObject): MetaObject {
    const readObject: MetaObject = new MetaObjectImpl(original.getType())
    readObject.setValues(original.getValues(), this)
    this.read(readObject)
    return readObject
  }

  abstract read(readObject: MetaObject): void

  protected abstract init(setupProperties: Properties): void
}
