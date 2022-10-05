import {JMenuBar} from "archipelago/api/util/jsdk/swing/JMenuBar"
import {JPanel} from "archipelago/api/util/jsdk/swing/JPanel"
import {JWindow} from "archipelago/api/util/jsdk/swing/JWindow"

export class JFrame extends JWindow {

  static readonly SHORT_DESCRIPTION = "SHORT_DESCRIPTION"
  contents: any
  private values = new Map<string, any>()
  private menuBar: JMenuBar | undefined = undefined

  constructor(protected name: string) {
    super()
  }

  putValue(key: string, value: any): void {
    this.values.set(key, value)
  }

  getValue(key: string): any {
    this.values.get(key)
  }

  setJMenuBar(menuBar: JMenuBar) {
    this.menuBar = menuBar
  }

  getJMenuBar(): JMenuBar | undefined {
    return this.menuBar
  }

  getContentPane(): JPanel {
    return this.contents
  }
}
