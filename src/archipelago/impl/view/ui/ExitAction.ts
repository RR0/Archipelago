import {MainFrame} from "archipelago/impl/view/ui/MainFrame"
import {AbstractAction, ActionEvent, JFrame} from "ts-jsdk"
import {JDialogResult} from "ts-jsdk/dist/swing/JDialog"
import {JOptionPane} from "ts-jsdk/dist/swing/JOptionPane"

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
