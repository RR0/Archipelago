import {MetaModel} from "archipelago/api/model/MetaModel"
import {MetaFunction} from "archipelago/api/model/MetaFunction"
import {IMAGE, MetaType, NUMBER, TEXT} from "archipelago/api/model/MetaType"
import {MetaTypeImpl} from "archipelago/api/model/MetaTypeImpl"
import {MetaFunctionImpl} from "archipelago/api/model/MetaFunctionImpl"
import {HashSet, JSerializable, JSet} from "ts-jsdk"

/**
 *
 */
export class MetaModelImpl implements MetaModel, JSerializable {
  private classes: JSet<MetaType> = new HashSet<MetaType>()
  private functions = new HashSet<MetaFunction>()

  constructor() {
    this.addMetaType(TEXT)
    this.addMetaType(NUMBER)
    this.addMetaType(IMAGE)
  }

  getClasses(): JSet<MetaType> {
    return this.classes
  }

  setClasses(classes: JSet<MetaType>) {
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

  createType(name: string): MetaType {
    return new MetaTypeImpl(name)
  }

  createFunction(): MetaFunction {
    return new MetaFunctionImpl()
  }

  getType(typeName: string): MetaType | null {
    for (let aClass of this.classes) {
      if (aClass.getName() === typeName) {
        return aClass
      }
    }
    return null
  }
}
