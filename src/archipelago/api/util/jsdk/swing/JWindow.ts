import {Dimension} from "archipelago/api/util/jsdk/swing/Dimension"

export class JWindowEvent {
  static WINDOW_CLOSING = 0

  getID(): string {
  }
}

export class JWindow {

  private enabled = true
  private visible = true
  private size: Dimension = new Dimension(800, 600)
  private x = 0
  private y = 0

  isVisible(): boolean {
    return this.visible
  }

  setVisible(value: boolean) {
    this.visible = value
  }

  pack(): void {

  }

  dispose(): void {
  }

  setEnabled(b: boolean) {
    this.enabled = b
  }

  isEnabled(): boolean {
    return this.enabled
  }

  protected getSize(): Dimension {
    return this.size
  }

  protected setLocation(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
