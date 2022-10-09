import {TypePane} from "archipelago/impl/view/ui/TypePane"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"
import {JOptionPane, JOptionPaneMessageType, JOptionPaneOptionType} from "ts-jsdk/dist/swing/JOptionPane"
import {AbstractAction, ActionEvent, DefaultMutableTreeNode, JFrame, MutableTreeNode, TreePath} from "ts-jsdk"
import {JDialogResult} from "ts-jsdk/dist/swing/JDialog"

export class AddClassAction extends AbstractAction {

  public constructor(protected readonly mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("MetaType.add"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Add a new type to the metamodel")
  }

  actionPerformed(_e: ActionEvent): void {
    const newMetaType = this.mainFrame.controller.getMetaModel().createType("<new type>")
    const typePane = new TypePane(this.mainFrame.controller, newMetaType)
    const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, typePane,
      this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPaneOptionType.OK_CANCEL_OPTION,
      JOptionPaneMessageType.PLAIN_MESSAGE, null, null, newMetaType)
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
