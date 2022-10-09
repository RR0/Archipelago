import {MainFrame} from "archipelago/impl/view/ui/MainFrame"
import {AbstractAction, ActionEvent, FileFilter, JFile, JFileChooser} from "ts-jsdk"
import {JDialogResult} from "ts-jsdk/dist/swing/JDialog"
import {JOptionPane, JOptionPaneMessageType} from "ts-jsdk/dist/swing/JOptionPane"

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

  async actionPerformed(_e: ActionEvent): Promise<void> {
    const returnVal = await this.openDialog.showOpenDialog(this.mainFrame)
    if (returnVal == JDialogResult.APPROVE_OPTION) {
      let selectedFile = this.openDialog.getSelectedFile()
      if (selectedFile) {
        this.loadMetaModel(selectedFile.getAbsolutePath())
        this.mainFrame.loadMetaData(this.mainFrame.controller.getMetaModel(), this.mainFrame.metaModelTreeModel,
          this.mainFrame.modelTree)
      }
    }
  }

  private loadMetaModel(fileName: string): void {
    try {
      this.mainFrame.controller.loadMetaMapping(fileName)
    } catch (e) {
      JOptionPane.showMessageDialog(this.mainFrame, (e as Error).message, "Error while loading ",
        JOptionPaneMessageType.ERROR_MESSAGE)
    }
  }
}
