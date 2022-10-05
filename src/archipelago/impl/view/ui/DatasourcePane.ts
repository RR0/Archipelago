import {JPanel} from "archipelago/api/util/jsdk/swing/JPanel"
import {JTextField} from "archipelago/api/util/jsdk/swing/JTextField"
import {Database} from "archipelago/api/model/Database"
import {JComboBox} from "archipelago/api/util/jsdk/swing/JComboBox"
import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {JLabel} from "archipelago/api/util/jsdk/swing/JLabel"
import {DefaultComboBoxModel} from "archipelago/api/util/jsdk/swing/DefaultComboBoxModel"
import {SpringLayout, SpringLayoutDirection} from "archipelago/api/util/jsdk/swing/SpringLayout"

export class DatasourcePane extends JPanel {
  private nameTextfield: JTextField
  private adaptersCombo: JComboBox

  constructor(protected controller: UFOPlatformController, protected datasource: Database) {
    super()
    const layout = new SpringLayout()
    this.setLayout(layout)

    const nameLabel = new JLabel("Name")
    this.nameTextfield = new JTextField(datasource.getName())
    const typeLabel = new JLabel("Adapter")
    this.adaptersCombo = this.createAdaptersCombo(controller)
    const selectedType = datasource.getAdapter() == null ? controller.getDefaultAdapter() : datasource.getAdapter()
    this.adaptersCombo.setSelectedItem(selectedType)
    this.add(nameLabel)
    this.add(this.nameTextfield)
    this.add(typeLabel)
    this.add(this.adaptersCombo)
    layout.putConstraint(SpringLayoutDirection.EAST, this, 5, SpringLayoutDirection.EAST, this.adaptersCombo)
    layout.putConstraint(SpringLayoutDirection.SOUTH, this, 5, SpringLayoutDirection.SOUTH, this.adaptersCombo)
    layout.putConstraint(SpringLayoutDirection.EAST, this.nameTextfield, 5, SpringLayoutDirection.EAST, this.adaptersCombo)
    layout.putConstraint(SpringLayoutDirection.WEST, nameLabel, 5, SpringLayoutDirection.WEST, this)
    layout.putConstraint(SpringLayoutDirection.NORTH, nameLabel, 5, SpringLayoutDirection.NORTH, this)
    layout.putConstraint(SpringLayoutDirection.WEST, this.nameTextfield, 5, SpringLayoutDirection.EAST, typeLabel)
    layout.putConstraint(SpringLayoutDirection.NORTH, this.nameTextfield, 0, SpringLayoutDirection.NORTH, nameLabel)
    layout.putConstraint(SpringLayoutDirection.WEST, typeLabel, 0, SpringLayoutDirection.WEST, nameLabel)
    layout.putConstraint(SpringLayoutDirection.NORTH, typeLabel, 5, SpringLayoutDirection.SOUTH, nameLabel)
    layout.putConstraint(SpringLayoutDirection.WEST, this.adaptersCombo, 5, SpringLayoutDirection.EAST, typeLabel)
    layout.putConstraint(SpringLayoutDirection.NORTH, this.adaptersCombo, 5, SpringLayoutDirection.SOUTH, this.nameTextfield)
  }

  ok(): void {
    const selectedItem = this.adaptersCombo.getSelectedItem()
    for (const adapter of this.controller.getAdapters()._set) {
      if (selectedItem.equals(adapter.getName())) {
        this.datasource.setAdapter(adapter)
        break
      }
    }
    this.datasource.setName(this.nameTextfield.getText())
  }

  private createAdaptersCombo(controller: UFOPlatformController): JComboBox {
    const adaptersCombo = new JComboBox()
    const adapters: string[] = []
    for (const adapter of controller.getAdapters()._set) {
      adapters.push(adapter.getName())
    }
    adaptersCombo.setModel(new class extends DefaultComboBoxModel {
      getElementAt(index: number): any {
        return adapters[index]
      }

      getSize(): number {
        return adapters.length
      }
    }())
    return adaptersCombo
  }
}
