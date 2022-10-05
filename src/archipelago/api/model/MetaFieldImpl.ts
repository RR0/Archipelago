import {MetaField} from "archipelago/api/model/MetaField"
import {MetaType} from "archipelago/api/model/MetaType"
import {JSerializable} from "archipelago/api/util/jsdk/util/JSerializable"

/**
 *
 */
export class MetaFieldImpl implements MetaField, JSerializable {

 // private owner: MetaType

  constructor(protected name: string, protected type: MetaType) {
  }

  /* getOwner(): MetaType {
     return this.owner
   }*/

  getType(): MetaType {
    return this.type
  }

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
  }

  setType(type: MetaType): void {
    this.type = type
  }

  /*setOwner(owner: MetaType): void {
    this.owner = owner
  }*/

  retrieve(_databaseMappings: any): void {
    /*
      Iterator iterator = mappings.iterator();
      while (iterator.hasNext()) {
          FieldMapping fieldMapping = (FieldMapping) iterator.next();
          fieldMapping.getDatabase();
      }
    */
  }

  toString(): string {
    return this.getName() + ": " + this.type
  }
}
