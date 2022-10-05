import {MetaType} from "archipelago/api/model/MetaType"

/**
 * @author <a href="mailto:rr0@rr0.org">Jerome Beau</a>
 * @version $revision$
 */
export interface MetaField {
  /**
   *
   * @return The MetaObject the field belongs to.
   */
  getOwner(): MetaType

  /**
   *
   * @return The name of the field
   */
  getName(): string

  /**
   * Retrive the field data from the mapped databases
   */
  retrieve(databaseMappings: any): void

  getType(): MetaType

  setName(name: string): void

  setType(type: MetaType): void
}
