import {MetaType, TEXT} from "archipelago/api/model/MetaType"
import {FieldPane} from "archipelago/impl/view/ui/FieldPane"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"
import {JOptionPane, JOptionPaneMessageType, JOptionPaneOptionType} from "ts-jsdk/dist/swing/JOptionPane"
import {AbstractAction, ActionEvent, DefaultMutableTreeNode, JFrame, TreePath} from "ts-jsdk"
import {JDialogResult} from "ts-jsdk/dist/swing/JDialog"

export class AddFieldAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("MetaField.add"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Add a new field to this class")
  }

  actionPerformed(_e: ActionEvent): void {
    const lastSelectedComponent = this.mainFrame.modelTree.getLastSelectedPathComponent()
    if (lastSelectedComponent instanceof DefaultMutableTreeNode) {
      const metaTypeNode = lastSelectedComponent as DefaultMutableTreeNode
      const metaType = metaTypeNode.getUserObject() as MetaType
      const metaField = metaType.createField("<new field>", TEXT)

      const fieldPane = new FieldPane(this.mainFrame.controller, metaField)
      const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, fieldPane,
        this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPaneOptionType.OK_CANCEL_OPTION,
        JOptionPaneMessageType.PLAIN_MESSAGE, null, null, metaField)
      if (choosenOption == JDialogResult.OK_OPTION) {
        fieldPane.ok()
        metaType.addField(metaField)
        const fieldNode = new DefaultMutableTreeNode(metaField)
        this.mainFrame.metaModelTreeModel.insertNodeInto(fieldNode, metaTypeNode, metaTypeNode.getChildCount())
        const pathes = fieldNode.getPath()
        const path = new TreePath(pathes)
        this.mainFrame.modelTree.makeVisible(path)
        this.mainFrame.setModified()
      }
    } else {
      JOptionPane.showMessageDialog(this.mainFrame, MainFrame.resourceBundle.getString("SelectATypeNodeFirst"))
    }
  }
}
