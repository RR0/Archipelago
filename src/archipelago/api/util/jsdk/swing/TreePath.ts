import {TreeNode} from "archipelago/api/util/jsdk/swing/TreeNode"

export class TreePath<T = any> {

  constructor(path: TreePath) {
  }

  getLastPathComponent(): TreeNode<T> {
    throw new Error("Not implemented")
  }
}
