import {MetaField} from "archipelago/api/model/MetaField"

/**
 *
 */
export interface MetaType {

  add(field: MetaField): void

  getFields(): Set<MetaField>

  getName(): string

  setName(name: string): void

  /**
   * Add a field to this type.
   *
   * @param metaField The field to add
   */
  addField(metaField: MetaField): void

  createField(): MetaField
}

const EMPTY_SET = new Set<MetaField>()

export const TEXT = new class implements MetaType {

  getName(): string {
    return "Text"
  }

  add(_field: MetaField): void {
  }

  getFields(): Set<MetaField> {
    return EMPTY_SET
  }

  setName(_name: string): void {
  }

  addField(_metaField: MetaField): void {
  }

  createField(): MetaField {
    throw new Error("Not implemented")
  }

  toString(): string {
    return this.getName()
  }
}()

export const NUMBER = new class implements MetaType {

  getName(): string {
    return "Number"
  }

  add(_field: MetaField): void {
  }

  getFields(): Set<MetaField> {
    return EMPTY_SET
  }

  setName(_name: string): void {
  }

  addField(_metaField: MetaField): void {
  }

  createField(): MetaField {
    throw new Error("Not implemented")
  }

  toString(): string {
    return this.getName()
  }
}()

export const IMAGE = new class implements MetaType {

  getName(): string {
    return "Image"
  }

  add(_field: MetaField): void {
  }

  getFields(): Set<MetaField> {
    return EMPTY_SET
  }

  setName(_name: string): void {
  }

  addField(_metaField: MetaField): void {
  }

  createField(): MetaField {
    throw new Error("Not implemented")
  }

  toString(): string {
    return this.getName()
  }
}()
