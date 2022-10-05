import {Merger} from "archipelago/api/control/Merger"
import {MetaDataSource} from "archipelago/api/model/MetaDataSource"
import {MetaObject} from "archipelago/api/model/MetaObject"
import {MetaObjectImpl} from "archipelago/api/model/MetaObjectImpl"

/**
 * Meta Object Merger implementation.
 */
export class MergerImpl implements Merger {
  /**
   * Merge two Meta Objects.
   *
   * @param firstObject The first object to merge.
   * @param secondObject The second object to merge.
   * @return The resulting merged object.
   */
  merge(firstObject: MetaObject, secondObject: MetaObject): MetaObject {
    const mergedObject = new MetaObjectImpl(firstObject.getType())
    const firstValues = firstObject.getValues()
    const iterator = firstValues.entries()
    while (iterator.hasNext()) {
      const entry = iterator.next() as Map.Entry
      const fieldName = entry.getKey() as string
      const firstValue = entry.getValue()
      const secondValue = secondObject.get(fieldName)
      if (firstValue == null) {
        if (secondValue == null) {
          mergedObject.set(fieldName, null, ALL_SOURCES)
        } else {
          mergedObject.set(fieldName, secondValue, secondObject.getSource(fieldName))
        }
      } else if (secondValue == null) {
        mergedObject.set(fieldName, firstValue, firstObject.getSource(fieldName))
      } else if (this.equals(firstValue, secondValue)) {
        mergedObject.set(fieldName, firstValue, ALL_SOURCES)
      } else {
        mergedObject.set(fieldName + "_1", firstValue, firstObject.getSource(fieldName))
        mergedObject.set(fieldName + "_2", secondValue, secondObject.getSource(fieldName))
      }
    }
    return mergedObject
  }

  private equals(firstValue: any, secondValue: any): boolean {
    return firstValue.equals(secondValue)
  }
}

export const ALL_SOURCES = new class implements MetaDataSource {
  getName(): string {
    return "<All sources>"
  }
}()
