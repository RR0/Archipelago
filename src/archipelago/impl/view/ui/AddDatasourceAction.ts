import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {DatasourcePane} from "archipelago/impl/view/ui/DatasourcePane"
import {JOptionPane, JOptionPaneMessageType, JOptionPaneOptionType} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

export class AddDatasourceAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("Datasource.add"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Define a new datasource")
  }

  actionPerformed(_e: ActionEvent): void {
    const newDatasource = this.mainFrame.controller.createDatasource()
    const pane = new DatasourcePane(this.mainFrame.controller, newDatasource)
    const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, pane,
      this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPaneOptionType.OK_CANCEL_OPTION,
      JOptionPaneMessageType.PLAIN_MESSAGE, null, null, newDatasource)
    if (choosenOption == JDialogResult.OK_OPTION) {
      pane.ok()
      this.mainFrame.controller.addDatasource(newDatasource)
//            modelTree.setSelectionPath(path);
      this.mainFrame.setModified()
    }
    const menuBar = this.mainFrame.getJMenuBar()
    if (menuBar) {
      menuBar.remove(this.mainFrame.databaseMenuIndex)
      menuBar.add(this.mainFrame.databaseMenu(this), this.mainFrame.databaseMenuIndex)
      menuBar.validate()
    }
  }
}
