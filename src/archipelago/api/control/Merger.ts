import {MetaObject} from "archipelago/api/model/MetaObject"

/**
 * A Meta Object Merger
 *
 * @author Jerome Beau
 * @version $revision$
 */
export interface Merger {

  /**
   * Merge two Meta Objects.
   *
   * @param firstObject The first object to merge.
   * @param secondObject The second object to merge.
   * @return The resulting merged object.
   */
  merge(firstObject: MetaObject, secondObject: MetaObject): MetaObject
}
