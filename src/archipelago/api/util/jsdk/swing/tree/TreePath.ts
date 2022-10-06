export class TreePath {

  constructor(private path: Object[]) {
  }

  getLastPathComponent(): Object {
    return this.path[this.path.length - 1]
  }
}
