import {UFOPlatformControllerImpl} from "archipelago/impl/src/ufomatics/archipelago/control/UFOPlatformControllerImpl"
import {LocalizerImpl} from "archipelago/impl/src/ufomatics/archipelago/util/LocalizerImpl"
import {MainFrame} from "archipelago/impl/src/ufomatics/archipelago/view/swing/MainFrame"

/**
 *
 */
export class Main {

  private static gui = true
  private static controller: UFOPlatformControllerImpl

  private static async initController(args: string[]): Promise<void> {
    const localizer = new LocalizerImpl(args)
    try {
      await import("rr0/database/archipelago/RR0DatabaseAdapter")
      await import("rr0/database/archipelago/OVNIFranceDatabaseAdapter")
    } catch (e) {
      console.error(e)
    }
    this.controller = new UFOPlatformControllerImpl(localizer)
  }

  private static setupGUI(controller: UFOPlatformControllerImpl): void {
    const mainFrame = new MainFrame(controller)
    mainFrame.pack()
    mainFrame.setVisible(true)
  }

  main(args: string[]) {
    Main.initController(args)
    if (Main.gui) {
      Main.setupGUI(Main.controller)
      this.welcome()
    }
  }

  welcome(): void {
  }
}
