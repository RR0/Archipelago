import {MetaObject} from "archipelago/api/model/MetaObject"
import {MetaType} from "archipelago/api/model/MetaType"
import {MetaObjectVisitor} from "archipelago/api/model/MetaObjectVisitor"
import {MetaDataSource} from "archipelago/api/model/MetaDataSource"
import {HashMap, JMap} from "ts-jsdk"

/**
 * A Meta Object instance.
 */
export class MetaObjectImpl implements MetaObject {

  private readonly type: MetaType

  /**
   * The values' sources
   */
  private sources = new HashMap()

  private values: JMap = new HashMap()

  /**
   * Creates a meta object instance.
   *
   * @param metaType The type of the meta object.
   */
  constructor(metaType: MetaType) {
    this.type = metaType
  }

  getType(): MetaType {
    return this.type
  }

  /**
   * Ask this meta object to accept a visit.
   *
   * @param visitor The visitor
   * @throws MetaException
   * @return The resulting MetaObject (original modified)
   */
  accept(visitor: MetaObjectVisitor): MetaObject {
    return visitor.visit(this)
  }

  getValues(): JMap {
    return this.values
  }

  /**
   * Set a set for values.
   */
  setValues(results: JMap, source: MetaDataSource): void {
    const iterator = results.entries()
    while (iterator.hasNext()) {
      const entry = iterator.next()
      const propertyName = entry.getKey() as string
      const propertyValue = entry.getValue()
      this.set(propertyName, propertyValue, source)
    }
  }

  get(fieldName: string): Object {
    return this.values.get(fieldName)
  }

  /**
   * Set a given property to a given value.
   *
   * @param propertyName
   * @param propertyValue
   * @param source
   */
  set(propertyName: string, propertyValue: any, source: MetaDataSource): void {
    this.values.put(propertyName, propertyValue)
    this.sources.put(propertyName, source)
  }

  toString(): string {
    let sb = this.getType().getName() + " { \n"
    const iterator = this.values.entries()
    while (iterator.hasNext()) {
      const entry = iterator.next()
      const fieldName = entry.getKey() as string
      const value = entry.getValue()
      const source = this.getSource(fieldName)
      sb += "  " + fieldName + "=" + value + " [" + source + "]\n"
    }
    return sb + "}"
  }

  getSource(fieldName: string): MetaDataSource {
    return this.sources.get(fieldName) as MetaDataSource
  }
}
