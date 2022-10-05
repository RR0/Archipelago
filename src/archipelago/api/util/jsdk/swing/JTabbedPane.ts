import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"
import {JPanel} from "archipelago/api/util/jsdk/swing/JPanel"

export class JTabbedPane extends JComponent {

  private tabs = new Map<string, JPanel>()

  addTab(name: string, _param2: any, panel: JPanel, _title: string) {
    this.tabs.set(name, panel)
  }
}
