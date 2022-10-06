import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {JDialog, JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"

export enum JOptionPaneMessageType {
  PLAIN_MESSAGE,
  ERROR_MESSAGE
}

export enum JOptionPaneOptionType {
  OK_CANCEL_OPTION
}

export class JOptionPane extends JDialog {

  static showMessageDialog(_parentFrame: JFrame, message: string, title?: string,
                           messageType?: JOptionPaneMessageType): JDialogResult {
    window.alert((messageType === JOptionPaneMessageType.ERROR_MESSAGE ? "Error: " : "") + title + ": " + message)
    return JDialogResult.APPROVE_OPTION
  }

  static showConfirmDialog(_parentFrame: JFrame, message: string): JDialogResult {
    return window.confirm(message) ? JDialogResult.APPROVE_OPTION : JDialogResult.CANCEL_OPTION
  }

  static showOptionDialog(_parentComponent: JFrame, _message: Object, _title: string,
                          _optionType: JOptionPaneOptionType,
                          _messageType: JOptionPaneMessageType, _icon: any, _options: Object[] | null,
                          _initialValue: Object): JDialogResult {
    // TODO: Implement a real custom popop
    return JDialogResult.OK_OPTION
  }
}
