import {MetaModel} from "archipelago/api/model/MetaModel"
import {MetaFunction} from "archipelago/api/model/MetaFunction"
import {IMAGE, MetaType, NUMBER, TEXT} from "archipelago/api/model/MetaType"
import {MetaTypeImpl} from "archipelago/api/model/MetaTypeImpl"
import {JSerializable} from "archipelago/api/util/jsdk/util/JSerializable"
import {HashSet} from "archipelago/api/util/jsdk/util/HashSet"
import {JSet} from "archipelago/api/util/jsdk/util/JSet"
import {MetaFunctionImpl} from "archipelago/api/model/MetaFunctionImpl"

/**
 *
 */
export class MetaModelImpl implements MetaModel, JSerializable {
  private classes = new HashSet<MetaType>()
  private functions = new HashSet<MetaFunction>()

  constructor() {
    this.addMetaType(TEXT)
    this.addMetaType(NUMBER)
    this.addMetaType(IMAGE)
  }

  getClasses(): JSet<MetaType> {
    return this.classes
  }

  setClasses(classes: HashSet<MetaType>) {
    this.classes = classes
  }

  isEmpty(): boolean {
    return this.classes.isEmpty() && this.functions.isEmpty()
  }

  addMetaType(metaType: MetaType): void {
    this.classes.add(metaType)
  }

  addFunction(metaFunction: MetaFunction): void {
    this.functions.add(metaFunction)
  }

  getFunctions(): JSet<MetaFunction> {
    return this.functions
  }

  setFunctions(functions: HashSet<MetaFunction>) {
    this.functions = functions
  }

  createType(): MetaType {
    return new MetaTypeImpl()
  }

  createFunction(): MetaFunction {
    return new MetaFunctionImpl()
  }

  getType(typeName: string): MetaType | null {
    for (let aClass of this.classes._set) {
      if (aClass.getName() === typeName) {
        return aClass
      }
    }
    return null
  }
}
