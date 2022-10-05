import {MutableTreeNode} from "archipelago/api/util/jsdk/swing/MutableTreeNode"
import {TreeNode} from "archipelago/api/util/jsdk/swing/TreeNode"
import {TreePath} from "archipelago/api/util/jsdk/swing/TreePath"

export class DefaultMutableTreeNode<T = any> implements MutableTreeNode<T> {

  protected nodes: TreeNode<T>[] = []

  constructor(private userObject: T) {
  }

  add(node: TreeNode<T>) {
    this.nodes.push(node)
  }

  remove(index: number): void {
    this.nodes = this.nodes.splice(index, 1)
  }

  getChildCount(): number {
    return this.nodes.length
  }

  getUserObject(): T {
    return this.userObject
  }

  getPath(): TreePath {

  }
}
