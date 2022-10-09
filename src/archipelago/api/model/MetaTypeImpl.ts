import {MetaType} from "archipelago/api/model/MetaType"
import {MetaField} from "archipelago/api/model/MetaField"
import {MetaFieldImpl} from "archipelago/api/model/MetaFieldImpl"
import {JSerializable} from "ts-jsdk"

/**
 *
 */
export class MetaTypeImpl implements MetaType, JSerializable {
  fields = new Set<MetaField>()

  constructor(public name: string) {
  }

  setName(name: string): void {
    this.name = name
  }

  addField(metaField: MetaField): void {
    this.fields.add(metaField)
  }

  createField(name: string, type: MetaType): MetaField {
    return new MetaFieldImpl(name, type)
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

export const VOID = new class extends MetaTypeImpl {
}("void")
