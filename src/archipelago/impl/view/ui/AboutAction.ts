import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {JOptionPane} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

export class AboutAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("About"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "About his application")
  }

  actionPerformed(_e: ActionEvent) {
    JOptionPane.showMessageDialog(this.mainFrame, "Archipelago 1.0a\n(c) 2006 Jérôme Beau\nGNU Licensed")
  }
}
