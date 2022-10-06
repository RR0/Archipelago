import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {FunctionPane} from "archipelago/impl/view/ui/FunctionPane"
import {JOptionPane, JOptionPaneMessageType, JOptionPaneOptionType} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {DefaultMutableTreeNode} from "archipelago/api/util/jsdk/swing/tree/DefaultMutableTreeNode"
import {MutableTreeNode} from "archipelago/api/util/jsdk/swing/tree/MutableTreeNode"
import {TreePath} from "archipelago/api/util/jsdk/swing/tree/TreePath"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

export class AddFunctionAction extends AbstractAction {
  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("MetaFunction.add"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Add a new function to the metamodel")
  }

  actionPerformed(_e: ActionEvent): void {
    const metaFunction = this.mainFrame.controller.getMetaModel().createFunction()
    const typePane = new FunctionPane(this.mainFrame.controller, metaFunction)
    const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, typePane,
      this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPaneOptionType.OK_CANCEL_OPTION,
      JOptionPaneMessageType.PLAIN_MESSAGE, null, null, metaFunction)
    if (choosenOption == JDialogResult.OK_OPTION) {
      typePane.ok()
      this.mainFrame.controller.getMetaModel().addFunction(metaFunction)
      const metaTypeNode = new DefaultMutableTreeNode(metaFunction)
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
