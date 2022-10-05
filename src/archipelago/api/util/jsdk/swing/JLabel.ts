import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"

export class JLabel extends JComponent {

  constructor(protected text: string) {
    super()
  }
}
