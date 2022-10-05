import {Dimension} from "archipelago/api/util/jsdk/swing/Dimension"
import {Point} from "archipelago/api/util/jsdk/swing/Point"

export class JWindowEvent {
  static WINDOW_CLOSING = "0"

  constructor(private id: string) {
  }

  getID(): string {
    return this.id
  }
}

export class JWindow {

  private enabled = true
  private visible = true
  private size: Dimension = new Dimension(800, 600)
  private location = new Point()

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

  getSize(): Dimension {
    return this.size
  }

  setLocation(x: number, y: number) {
    this.location = new Point(x, y)
  }

  getLocation(): Point {
    return this.location
  }
}
