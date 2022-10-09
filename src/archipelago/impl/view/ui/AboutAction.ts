import {MainFrame} from "archipelago/impl/view/ui/MainFrame"
import {AbstractAction, ActionEvent, JFrame} from "ts-jsdk"
import {JOptionPane} from "ts-jsdk/dist/swing/JOptionPane"

export class AboutAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("About"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "About his application")
  }

  actionPerformed(_e: ActionEvent) {
    JOptionPane.showMessageDialog(this.mainFrame, "Archipelago 1.0a\n(c) 2006 Jérôme Beau\nGNU Licensed")
  }
}
