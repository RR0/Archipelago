import {MetaField} from "archipelago/api/model/MetaField"
import {MetaType} from "archipelago/api/model/MetaType"

/**
 *
 */
export interface MetaFunction {

  add(parameter: MetaField): void

  getParameters(): Set<MetaField>

  getName(): string

  setName(name: string): void

  createParameter(): MetaField

  getReturnType(): MetaType

  setReturnType(returnType: MetaType): void
}
