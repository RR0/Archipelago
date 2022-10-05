import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {PreferencesDialog} from "archipelago/impl/view/ui/PreferencesDialog"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

export class PreferencesAction extends AbstractAction {
  protected newDatasourceDialog: PreferencesDialog

  constructor(protected mainFrame: MainFrame) {
    super("Preferences")
    this.newDatasourceDialog = new PreferencesDialog(this.mainFrame, this.mainFrame.controller)
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Setup application preferences")
  }

  actionPerformed(_e: ActionEvent): void {
    this.newDatasourceDialog.pack()
    this.newDatasourceDialog.setVisible(true)
  }
}
