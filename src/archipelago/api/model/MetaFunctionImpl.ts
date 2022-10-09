import {MetaFunction} from "archipelago/api/model/MetaFunction"
import {MetaField} from "archipelago/api/model/MetaField"
import {MetaType} from "archipelago/api/model/MetaType"
import {MetaFieldImpl} from "archipelago/api/model/MetaFieldImpl"
import {VOID} from "archipelago/api/model/MetaTypeImpl"
import {JSerializable} from "ts-jsdk"

/**
 *
 */
export class MetaFunctionImpl implements MetaFunction, JSerializable {
  private name = ""
  private parameters = new Set<MetaField>()
  private returnType: MetaType = VOID

  constructor() {
  }

  setName(name: string): void {
    this.name = name
  }

  addParameter(metaField: MetaField): void {
    this.parameters.add(metaField)
  }

  createParameter(name: string, type: MetaType): MetaField {
    return new MetaFieldImpl(name, type)
  }

  getName(): string {
    return this.name
  }

  add(field: MetaField): void {
    this.parameters.add(field)
  }

  setParameters(parameters: Set<MetaField>): void {
    this.parameters = parameters
  }

  getParameters(): Set<MetaField> {
    return this.parameters
  }

  getReturnType(): MetaType {
    return this.returnType
  }

  setReturnType(returnType: MetaType): void {
    this.returnType = returnType
  }

  toString(): string {
    return this.getName() + ": " + this.getReturnType()
  }
}
