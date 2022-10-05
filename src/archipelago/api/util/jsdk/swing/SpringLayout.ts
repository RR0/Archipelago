import {LayoutManager} from "archipelago/api/util/jsdk/swing/LayoutManager"
import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"

export enum SpringLayoutDirection {
  EAST = "EAST",
  SOUTH = "SOUTH",
  WEST = "WEST",
  NORTH = "NORTH"
}

export class SpringLayout implements LayoutManager {

  putConstraint(_direction: SpringLayoutDirection, _comp: JComponent, _num: number, _dir2: SpringLayoutDirection, _comp2: JComponent): void {
  }
}
