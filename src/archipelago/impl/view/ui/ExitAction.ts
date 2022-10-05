import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {JOptionPane} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

export class ExitAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("File.exit"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Exit the application")
  }

  actionPerformed(_e: ActionEvent): void {
    if (this.exitConfirmation()) {
      this.mainFrame.controller.close()
      this.mainFrame.dispose()
      process.exit(0)
    }
  }

  private exitConfirmation(): boolean {
    return !this.mainFrame.checkExitConfirmation || JOptionPane.showConfirmDialog(this.mainFrame, "Are you" +
      " sure ?") == JDialogResult.APPROVE_OPTION
  }
}
