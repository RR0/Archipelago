import {UFOPlatformControllerImpl} from "archipelago/impl/control/UFOPlatformControllerImpl"
import {LocalizerImpl} from "archipelago/impl/util/LocalizerImpl"
import {MainFrame} from "archipelago/impl/view/ui/MainFrame"
import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {DatabaseAdapter} from "archipelago/api/model/DatabaseAdapter"
import {HashSet} from "ts-jsdk"

const gui = true

async function initController(args: string[]): Promise<UFOPlatformController> {
  const localizer = new LocalizerImpl(args)
  const adapters = new HashSet<DatabaseAdapter>()
  adapters.add(await import("database/rr0/RR0ArchipelagoAdapter"))
  adapters.add(await import("database/ovnifrance/OvniFranceArchipelagoAdapter"))
  return new UFOPlatformControllerImpl(localizer, adapters)
}

function setupGUI(controller: UFOPlatformController): void {
  const mainFrame = new MainFrame(controller)
  mainFrame.pack()
  mainFrame.setVisible(true)
}

function welcome(): void {
}

const args = process.argv
initController(args).then(controller => {
  if (gui) {
    setupGUI(controller)
    welcome()
  }
})

