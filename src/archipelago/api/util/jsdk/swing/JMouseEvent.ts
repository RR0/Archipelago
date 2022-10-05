import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"

export class JMouseEvent {
  private popupTrigger = false
  private clickCount = 1

  constructor(private target: JComponent, private x: number, private y: number) {
  }

  isPopupTrigger(): boolean {
    return this.popupTrigger
  }

  getClickCount(): number {
    return this.clickCount
  }

  getComponent(): JComponent {
    return this.target
  }

  getX(): number {
    return this.x
  }

  getY(): number {
    return this.y
  }
}
