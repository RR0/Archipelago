import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"

export interface Action {
  actionPerformed(event: ActionEvent): void

  setEnabled(enabled: boolean): void
}
