import {UFOPlatformControllerImpl} from "archipelago/impl/control/UFOPlatformControllerImpl"
import {LocalizerImpl} from "archipelago/impl/util/LocalizerImpl"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"

/**
 *
 */
export class Main {

  private static gui = true
  private static controller: UFOPlatformControllerImpl

  private static async initController(args: string[]): Promise<void> {
    const localizer = new LocalizerImpl(args)
    try {
      await import("database/rr0/RR0ArchipelagoAdapter")
      await import("database/ovnifrance/OvniFranceArchipelagoAdapter")
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
