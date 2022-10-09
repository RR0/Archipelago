import {DatabaseAdapter} from "archipelago/api/model/DatabaseAdapter"
import {MetaObject} from "archipelago/api/model/MetaObject"
import {MetaObjectImpl} from "archipelago/api/model/MetaObjectImpl"
import {MetaModel} from "archipelago/api/model/MetaModel"
import {MetaModelImpl} from "archipelago/api/model/MetaModelImpl"
import {Properties} from "ts-jsdk"

/**
 *
 */
export abstract class AbstractDatabaseAdapter implements DatabaseAdapter {

  private properties: Properties = new Properties()

  constructor(readonly dataModel: MetaModel = new MetaModelImpl()) {
  }

  abstract getName(): string

  close(): void {
  }

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
    const readObject = new MetaObjectImpl(original.getType())
    readObject.setValues(original.getValues(), this)
    this.read(readObject)
    return readObject
  }

  abstract read(readObject: MetaObject): void

  protected abstract init(setupProperties: Properties): void
}
