import {MetaDataSource} from "archipelago/api/model/MetaDataSource"
import {MetaObjectVisitor} from "archipelago/api/model/MetaObjectVisitor"
import {MetaType} from "archipelago/api/model/MetaType"
import {JMap} from "ts-jsdk"

/**
 * An instance of a MetaClass.
 *
 * @author <a href="mailto:rr0@rr0.org">Jerome Beau</a>
 * @version $revision$
 */
export interface MetaObject {
  accept(visitor: MetaObjectVisitor): MetaObject

//
//    Object getValue(MetaField field);
//
//    void setValue(MetaField field, Object value);

  getType(): MetaType

  /**
   * Set the values for this object.
   * All other previous values will be removed.
   *
   * @param values The values to store into this object.
   * @param source
   */
  setValues(values: JMap, source: MetaDataSource): void

  /**
   * Get the values contained in this object.
   *
   * @return The values, indexed by field name
   */
  getValues(): JMap

  /**
   * Set the value of a field of this object.
   *
   * @param fieldName The name of object's field that will hold the value
   * @param value The data value
   * @param source The source of the data
   */
  set(fieldName: string, value: any, source: MetaDataSource): void

  /**
   * Get a field value.
   *
   * @param fieldName The name of the field
   * @return The current value of this field
   */
  get(fieldName: string): any

  /**
   * Get the source of a given field value.
   *
   * @param fieldName The name of the field that holds the value.
   * @return The source of this field value.
   */
  getSource(fieldName: string): MetaDataSource
}
