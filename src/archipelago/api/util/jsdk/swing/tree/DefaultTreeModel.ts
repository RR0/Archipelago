import {TreeModel} from "archipelago/api/util/jsdk/swing/tree/TreeModel"
import {TreeNode} from "archipelago/api/util/jsdk/swing/tree/TreeNode"
import {DefaultMutableTreeNode} from "archipelago/api/util/jsdk/swing/tree/DefaultMutableTreeNode"

export class DefaultTreeModel<T = any> implements TreeModel {

  constructor(private root: TreeNode<T>) {
  }

  getRoot(): TreeNode<T> {
    return this.root
  }

  removeAll(): void {
    this.root = new DefaultMutableTreeNode(this.root.getUserObject())
  }

  reload() {
  }

  insertNodeInto(_node: TreeNode<T>, _root: TreeNode<T>, _childCount: number): void {
  }
}
