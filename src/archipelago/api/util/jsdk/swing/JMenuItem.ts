import {Action} from "archipelago/api/util/jsdk/swing/Action"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"

export class DefaultAction implements Action {

  private enabled = true

  constructor(protected text: string) {
  }

  actionPerformed(_event: ActionEvent): void {
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  isEnabled(): boolean {
    return this.enabled
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
