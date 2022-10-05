import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {JWindow} from "archipelago/api/util/jsdk/swing/JWindow"

export enum JDialogResult {
  APPROVE_OPTION = 0,
  OK_OPTION = 1
}

export class JDialog extends JWindow {

  constructor(protected parent: JFrame, protected modal: boolean) {
    super()
  }
}
