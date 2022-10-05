import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {DefaultMutableTreeNode} from "archipelago/api/util/jsdk/swing/DefaultMutableTreeNode"
import {MetaType} from "archipelago/api/model/MetaType"
import {MetaField} from "archipelago/api/model/MetaField"
import {FieldPane} from "archipelago/impl/view/ui/FieldPane"
import {JOptionPane} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {TreePath} from "archipelago/api/util/jsdk/swing/TreePath"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

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
      const metaField = metaType.createField() as MetaField

      const fieldPane = new FieldPane(this.mainFrame.controller, metaField)
      const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, fieldPane, this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, metaField)
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
