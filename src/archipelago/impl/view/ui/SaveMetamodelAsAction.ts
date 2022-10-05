import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {JFileChooser} from "archipelago/api/util/jsdk/swing/JFileChooser"
import {FileFilter} from "archipelago/api/util/jsdk/FileFilter"
import {JFile} from "archipelago/api/util/jsdk/util/JFile"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {JOptionPane} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

export class SaveMetamodelAsAction extends AbstractAction {
  private saveDialog: JFileChooser

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("File.saveAs"))
    this.mainFrame.putValue(MainFrame.SHORT_DESCRIPTION, "Save the current metamodel in a given file")
    this.mainFrame.setEnabled(this.mainFrame.controller.hasMetaModel())

    this.saveDialog = new JFileChooser()
    const filter = new class extends FileFilter {
      accept(_f: JFile): boolean {
        return _f.getAbsolutePath().endsWith(".xml")
      }

      getDescription(): string {
        return "Archipelago metamodel XML files"
      }
    }()
    this.saveDialog.setFileFilter(filter)
  }

  actionPerformed(_e: ActionEvent): void {
    const returnVal = this.saveDialog.showOpenDialog(this.mainFrame)
    if (returnVal == JDialogResult.APPROVE_OPTION) {
      try {
        let selectedFile = this.saveDialog.getSelectedFile()
        if (selectedFile) {
          this.mainFrame.currentMetamodelFilename = selectedFile.getAbsolutePath()
          this.mainFrame.controller.saveMetaMapping(this.mainFrame.currentMetamodelFilename)
        }
      } catch (e1) {
        console.error(e1)
        JOptionPane.showMessageDialog(this.mainFrame, (e1 as Error).message)
      }
    }
  }
}
