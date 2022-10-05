import {JMenuItem} from "archipelago/api/util/jsdk/swing/JMenuItem"
import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"

export class JMenu extends JComponent {

  private items: (JMenuItem | JMenu)[] = []

  constructor(name?: string) {
    super(name)
  }

  add(item: JMenuItem | JMenu): void {
    this.items.push(item)
  }
}
