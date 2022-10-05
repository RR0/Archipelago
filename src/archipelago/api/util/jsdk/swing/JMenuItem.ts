import {Action} from "archipelago/api/util/jsdk/swing/Action"
import {ActionEvent} from "archipelago/api/util/jsdk/swing/ActionEvent"
import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"

export class DefaultAction implements Action {
  constructor(protected text: string) {
  }

  actionPerformed(_event: ActionEvent): void {
  }
}

export class JMenuItem extends JComponent {

  private action: Action

  constructor(action: string | Action) {
    super()
    if (typeof action === "string") {
      this.action = new DefaultAction(action)
    } else {
      this.action = action
    }
  }
}
