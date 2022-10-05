import {JDialog} from "archipelago/api/util/jsdk/swing/JDialog"
import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {MainFrame} from "archipelago/impl/src/ufomatics/archipelago/view/swing/MainFrame"
import {JCheckBox} from "archipelago/api/util/jsdk/swing/JCheckBox"

export class PreferencesDialog extends JDialog {
  /* private buttonOK: JButton
   private buttonCancel: JButton*/
  private confimExitCheckBox = new JCheckBox()

  constructor(mainFrame: MainFrame, protected controller: UFOPlatformController) {
    super(mainFrame, true)
    this.controller = controller
  }

  setData(data: MainFrame): void {
    this.confimExitCheckBox.setSelected(data.isCheckExitConfirmation())
  }

  getData(data: MainFrame): void {
    data.setCheckExitConfirmation(this.confimExitCheckBox.isSelected())
  }

  isModified(data: MainFrame): boolean {
    if (this.confimExitCheckBox.isSelected() != data.isCheckExitConfirmation()) {
      return true
    }
    return false
  }
}
