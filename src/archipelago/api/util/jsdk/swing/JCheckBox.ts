import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"

export class JCheckBox extends JComponent {

  constructor(private selected = false) {
    super()
  }

  isSelected(): boolean {
    return this.selected
  }

  setSelected(b: boolean) {
    this.selected = b
  }
}
