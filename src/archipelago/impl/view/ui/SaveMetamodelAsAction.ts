import {MainFrame} from "archipelago/impl/view/ui/MainFrame"
import {AbstractAction, ActionEvent, FileFilter, JFile, JFileChooser} from "ts-jsdk"
import {JDialogResult} from "ts-jsdk/dist/swing/JDialog"
import {JOptionPane} from "ts-jsdk/dist/swing/JOptionPane"

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

  async actionPerformed(_e: ActionEvent): Promise<void> {
    const returnVal = await this.saveDialog.showOpenDialog(this.mainFrame)
    if (returnVal == JDialogResult.APPROVE_OPTION) {
      try {
        let selectedFile = this.saveDialog.getSelectedFile()
        if (selectedFile) {
          this.mainFrame.currentMetamodelFilename = selectedFile.getAbsolutePath()
          this.mainFrame.controller.saveMetaMapping(this.mainFrame.currentMetamodelFilename)
        }
      } catch (e) {
        console.error(e)
        JOptionPane.showMessageDialog(this.mainFrame, (e as Error).message)
      }
    }
  }
}
