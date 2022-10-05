import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {JFileChooser} from "archipelago/api/util/jsdk/swing/JFileChooser"
import {FileFilter} from "archipelago/api/util/jsdk/FileFilter"
import {JFile} from "archipelago/api/util/jsdk/util/JFile"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {JOptionPane} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

export class OpenMetamodelAction extends AbstractAction {
  protected openDialog: JFileChooser

  public constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("File.open"))
    this.openDialog = new JFileChooser()
    const filter = new class extends FileFilter {
      accept(_f: JFile): boolean {
        return _f.getAbsolutePath().endsWith(".xml")
      }

      getDescription(): string {
        return "Archipelago metamodel XML files"
      }
    }()
    this.openDialog.setFileFilter(filter)
    mainFrame.putValue(MainFrame.SHORT_DESCRIPTION, "Open an existing metamodel file")
  }

  actionPerformed(_e: ActionEvent): void {
    const returnVal = this.openDialog.showOpenDialog(this.mainFrame)
    if (returnVal == JDialogResult.APPROVE_OPTION) {
      let selectedFile = this.openDialog.getSelectedFile()
      if (selectedFile) {
        this.loadMetaModel(selectedFile.getAbsolutePath())
        this.mainFrame.loadMetaData(this.mainFrame.controller.getMetaModel(), this.mainFrame.metaModelTreeModel, this.mainFrame.modelTree)
      }
    }
  }

  private loadMetaModel(name: string): void {
    try {
      this.mainFrame.controller.loadMetaMapping(name)
    } catch (e) {
      JOptionPane.showMessageDialog(this.mainFrame, (e as Error).message, "Error while loading ", JOptionPane.ERROR_MESSAGE)
    }
  }
}
