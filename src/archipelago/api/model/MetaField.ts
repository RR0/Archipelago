import {MetaType} from "archipelago/api/model/MetaType"

/**
 *
 */
export interface MetaField {
  /**
   *
   * @return The MetaObject the field belongs to.
   */

  //getOwner(): MetaType

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
