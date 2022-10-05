import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {TypePane} from "archipelago/impl/view/ui/TypePane"
import {JOptionPane} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {DefaultMutableTreeNode} from "archipelago/api/util/jsdk/swing/DefaultMutableTreeNode"
import {MutableTreeNode} from "archipelago/api/util/jsdk/swing/MutableTreeNode"
import {TreePath} from "archipelago/api/util/jsdk/swing/TreePath"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

export class AddClassAction extends AbstractAction {
  public constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("MetaType.add"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Add a new type to the metamodel")
  }

  actionPerformed(_e: ActionEvent): void {
    const newMetaType = this.mainFrame.controller.getMetaModel().createType()
    const typePane = new TypePane(this.mainFrame.controller, newMetaType)
    const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, typePane, this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, newMetaType)
    if (choosenOption == JDialogResult.OK_OPTION) {
      typePane.ok()
      this.mainFrame.controller.getMetaModel().addMetaType(newMetaType)
      const metaTypeNode = new DefaultMutableTreeNode(newMetaType)
      const root = this.mainFrame.metaModelTreeModel.getRoot() as MutableTreeNode
      this.mainFrame.metaModelTreeModel.insertNodeInto(metaTypeNode, root, root.getChildCount())
      const pathes = metaTypeNode.getPath()
      const path = new TreePath(pathes)
      this.mainFrame.modelTree.makeVisible(path)
//            modelTree.setSelectionPath(path);
      this.mainFrame.setModified()
    }
  }
}
