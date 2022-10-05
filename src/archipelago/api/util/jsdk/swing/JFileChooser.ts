import {FileFilter} from "archipelago/api/util/jsdk/FileFilter"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {JFile} from "archipelago/api/util/jsdk/util/JFile"

export class JFileChooser {

  protected filter: FileFilter | undefined
  private selectedFile: JFile | undefined

  setFileFilter(filter: FileFilter) {
    this.filter = filter
  }

  showOpenDialog(_parentFrame: JFrame): JDialogResult {
    return JDialogResult.APPROVE_OPTION
  }

  getSelectedFile(): JFile | undefined {
    return this.selectedFile
  }
}
