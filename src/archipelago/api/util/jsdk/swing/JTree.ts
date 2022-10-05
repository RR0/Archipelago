import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"
import {TreePath} from "archipelago/api/util/jsdk/swing/TreePath"
import {TreeModel} from "archipelago/api/util/jsdk/swing/TreeModel"
import {TreeCellRenderer} from "archipelago/api/util/jsdk/swing/TreeCellRenderer"
import {TreeNode} from "archipelago/api/util/jsdk/swing/TreeNode"
import {DefaultTreeCellRenderer} from "archipelago/api/util/jsdk/swing/DefaultTreeCellRenderer"

export class JTree<T = any> extends JComponent {
  private _cellRenderer: TreeCellRenderer = new DefaultTreeCellRenderer()

  constructor(private model: TreeModel<T>) {
    super()
  }

  get cellRenderer(): TreeCellRenderer {
    return this._cellRenderer
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
    return null!
  }

  setCellRenderer(renderer: TreeCellRenderer) {
    this._cellRenderer = renderer
  }

  getLastSelectedPathComponent(): TreeNode<T> {
    return null!
  }
}
