import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {JDialog, JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {JPanel} from "archipelago/api/util/jsdk/swing/JPanel"


export class JOptionPane extends JDialog {

  static readonly OK_CANCEL_OPTION = "OK_CANCEL_OPTION"
  static readonly PLAIN_MESSAGE = "PLAIN_MESSAGE"

  static showMessageDialog(_parentFrame: JFrame, _message: string): JDialogResult {
    return JDialogResult.APPROVE_OPTION
  }

  static showConfirmDialog(_parentFrame: JFrame, _message: string): JDialogResult {
    return JDialogResult.APPROVE_OPTION
  }

  static showOptionDialog(_parentFrame: JFrame, _contents: JPanel, _message: string, _buttons: string, _contentType: string, _a: any, _b: any, _c: any): JDialogResult {
    return JDialogResult.OK_OPTION
  }
}
