import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"
import {LayoutManager} from "archipelago/api/util/jsdk/swing/LayoutManager"
import {BorderLayout} from "archipelago/api/util/jsdk/swing/BorderLayout"

export class JPanel extends JComponent {

  protected components: JComponent[] = []
  protected layout: LayoutManager = new BorderLayout()

  add(comp: JComponent) {
    this.components.push(comp)
  }

  setLayout(layout: LayoutManager) {
    this.layout = layout
  }
}
