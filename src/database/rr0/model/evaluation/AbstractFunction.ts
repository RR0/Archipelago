export abstract class AbstractFunction {

  private static functions: { [name: string]: AbstractFunction } = {}

  static getFunction(name: string): AbstractFunction | undefined {
    return AbstractFunction.functions[name]
  }
}
