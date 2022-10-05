import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"
import {JMenu} from "archipelago/api/util/jsdk/swing/JMenu"

export class JMenuBar extends JComponent {

  constructor(private menus: JMenu[] = []) {
    super()
  }

  getMenuCount(): number {
    return this.menus.length
  }

  add(menu: JMenu, index = this.menus.length): void {
    this.menus = this.menus.splice(index, 0, menu)
  }

  remove(menuIndex: number) {
    this.menus = this.menus.splice(menuIndex, 1)
  }
}
