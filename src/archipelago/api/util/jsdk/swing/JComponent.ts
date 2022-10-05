import {Font} from "archipelago/api/util/jsdk/swing/Font"
import {FocusListener} from "archipelago/api/util/jsdk/swing/FocusListener"
import {MouseListener} from "archipelago/api/util/jsdk/swing/MouseListener"
import {Color} from "archipelago/api/util/jsdk/swing/Color"

export class JComponent {
  private font: Font = Font.DEFAULT
  private enabled = true
  private visible = true
  private background: Color = Color.GRAY

  constructor(public contents?: any) {
  }

  getFont(): Font {
    return this.font
  }

  setEnabled(b: boolean) {
    this.enabled = b
  }

  isEnabled(): boolean {
    return this.enabled
  }

  isVisible(): boolean {
    return this.visible
  }

  setVisible(value: boolean) {
    this.visible = value
  }

  addFocusListener(_listener: FocusListener) {

  }

  addMouseListener(_listener: MouseListener) {
  }

  validate(): void {
  }

  getBackground(): Color {
    return this.background
  }
}
