import {TreeModel} from "archipelago/api/util/jsdk/swing/TreeModel"
import {TreeNode} from "archipelago/api/util/jsdk/swing/TreeNode"

export class DefaultTreeModel<T = any> implements TreeModel<T> {

  private nodes: TreeNode<T>[] = []

  constructor(private root: TreeNode<T>) {
  }

  getRoot(): TreeNode<T> {
    return this.root
  }

  removeAll(): void {
    this.nodes = []
  }

  reload() {

  }

  insertNodeInto(node: TreeNode<T>, root: TreeNode<T>, childCount: number) {

  }
}
