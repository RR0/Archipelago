import {PreferencesDialog} from "archipelago/impl/view/ui/PreferencesDialog"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"
import {AbstractAction, ActionEvent, JFrame} from "ts-jsdk"

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
