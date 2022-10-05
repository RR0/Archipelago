import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {JOptionPane} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

export class SaveMetamodelAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("File.save"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Save the current metamodel")
    this.mainFrame.setEnabled(this.mainFrame.controller.hasMetaModel())
  }

  public actionPerformed(e: ActionEvent): void {
    if (this.mainFrame.currentMetamodelFilename) {
      try {
        this.mainFrame.controller.saveMetaMapping(this.mainFrame.currentMetamodelFilename)
      } catch (e1) {
        console.error(e1)
        JOptionPane.showMessageDialog(this.mainFrame, (e1 as Error).message)
      }
    } else {
      this.mainFrame.saveAsAction.actionPerformed(e)
    }
  }
}
