import {Action} from "archipelago/api/util/jsdk/swing/Action"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"

export abstract class AbstractAction implements Action {

  private _enabled = true

  protected constructor(protected name?: string) {
  }

  setEnabled(enabled: boolean): void {
    this._enabled = enabled
  }

  isEnabled(): boolean {
    return this._enabled
  }

  abstract actionPerformed(event: ActionEvent): void
}
