import {FunctionPane} from "archipelago/impl/view/ui/FunctionPane"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"
import {JOptionPane, JOptionPaneMessageType, JOptionPaneOptionType} from "ts-jsdk/dist/swing/JOptionPane"
import {AbstractAction, ActionEvent, DefaultMutableTreeNode, JFrame, MutableTreeNode, TreePath} from "ts-jsdk"
import {JDialogResult} from "ts-jsdk/dist/swing/JDialog"

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
