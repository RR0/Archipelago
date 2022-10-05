import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"

export enum JSplitPaneDirection {
  HORIZONTAL_SPLIT = "HORIZONTAL_SPLIT"
}

export class JSplitPane extends JComponent {

  constructor(private _orientation: JSplitPaneDirection, private _leftComponent: JComponent, private _rightComponent: JComponent) {
    super()
  }

  getOrientation(): JSplitPaneDirection {
    return this._orientation
  }

  getLeftComponent(): JComponent {
    return this._leftComponent
  }

  getRightComponent(): JComponent {
    return this._rightComponent
  }
}
