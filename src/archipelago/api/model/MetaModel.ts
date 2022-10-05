import {MetaType} from "archipelago/api/model/MetaType"
import {MetaFunction} from "archipelago/api/model/MetaFunction"
import {JSet} from "archipelago/api/util/jsdk/util/JSet"

/**
 *
 */
export interface MetaModel {

  getClasses(): JSet<MetaType>

  getFunctions(): JSet<MetaFunction>

  isEmpty(): boolean

  addMetaType(metaType: MetaType): void

  addFunction(metaFunction: MetaFunction): void

  createType(): MetaType

  createFunction(): MetaFunction
}
