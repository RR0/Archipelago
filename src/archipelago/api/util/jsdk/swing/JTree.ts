import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"
import {TreePath} from "archipelago/api/util/jsdk/swing/TreePath"
import {TreeModel} from "archipelago/api/util/jsdk/swing/TreeModel"
import {TreeCellRenderer} from "archipelago/api/util/jsdk/swing/TreeCellRenderer"
import {TreeNode} from "archipelago/api/util/jsdk/swing/TreeNode"

export class JTree<T = any> extends JComponent {
  private cellRenderer: TreeCellRenderer

  constructor(private model: TreeModel<T>) {
    super()
  }

  makeVisible(_path: TreePath) {
  }

  setShowsRootHandles(_b: boolean) {
  }

  putClientProperty(_lineStyle: string, _angled: string) {
  }

  removeAll() {
    this.model.removeAll()
  }

  getPathForLocation(_x: number, _y: number): TreePath<T> {
  }

  setCellRenderer(renderer: TreeCellRenderer) {
    this.cellRenderer = renderer
  }

  getLastSelectedPathComponent(): TreeNode<T> {

  }
}
