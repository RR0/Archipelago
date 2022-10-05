import {JPanel} from "archipelago/api/util/jsdk/swing/JPanel"
import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {JComboBox} from "archipelago/api/util/jsdk/swing/JComboBox"
import {DefaultComboBoxModel} from "archipelago/api/util/jsdk/swing/DefaultComboBoxModel"

/**
 *
 */
export abstract class AbstractPane extends JPanel {

  protected createTypeCombo(controller: UFOPlatformController): JComboBox {
    const comboBox = new JComboBox(new class extends DefaultComboBoxModel {
      getElementAt(index: number): any {
        let i = 0
        for (const metaType of controller.getMetaModel().getClasses()._set) {
          if (i == index) {
            return metaType
          }
          i++
        }
        return "<Undefined>"
      }

      // implements javax.swing.ListModel
      getSize(): number {
        return controller.getMetaModel().getClasses().size()
      }
    })
    return comboBox
  }
}
