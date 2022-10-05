import {MetaType} from "archipelago/api/model/MetaType"
import {MetaField} from "archipelago/api/model/MetaField"
import {MetaFieldImpl} from "archipelago/api/model/MetaFieldImpl"
import {JSerializable} from "archipelago/api/util/jsdk/util/JSerializable"

/**
 *
 */
export class MetaTypeImpl implements MetaType, JSerializable {
  private fields = new Set<MetaField>()

  constructor(private name: string) {
  }

  setName(name: string): void {
    this.name = name
  }

  addField(metaField: MetaField): void {
    this.fields.add(metaField)
  }

  createField(): MetaField {
    return new MetaFieldImpl()
  }

  getName(): string {
    return this.name
  }

  add(field: MetaField): void {
    this.fields.add(field)
  }

  setFields(fields: Set<MetaField>): void {
    this.fields = fields
  }

  getFields(): Set<MetaField> {
    return this.fields
  }

  toString(): string {
    return this.getName()
  }
}
