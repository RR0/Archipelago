import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"
import {TreeModel} from "archipelago/api/util/jsdk/swing/TreeModel"

export enum JSplitPaneDirection {
  HORIZONTAL_SPLIT = "HORIZONTAL_SPLIT"
}

export class JSplitPane extends JComponent {

  constructor(private _direction: JSplitPaneDirection, private _model: TreeModel, _contents: any) {
    super()
  }
}
