import {AbstractPane} from "archipelago/impl/src/ufomatics/archipelago/view/swing/AbstractPane"
import {SpringLayout, SpringLayoutDirection} from "archipelago/api/util/jsdk/swing/SpringLayout"
import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {MetaField} from "archipelago/api/model/MetaField"
import {JLabel} from "archipelago/api/util/jsdk/swing/JLabel"
import {JTextField} from "archipelago/api/util/jsdk/swing/JTextField"
import {MetaType} from "archipelago/api/model/MetaType"
import {JComboBox} from "archipelago/api/util/jsdk/swing/JComboBox"

export class FieldPane extends AbstractPane {

  private readonly nameTextfield: JTextField
  private readonly typeCombo: JComboBox

  /*private descriptionTextarea: JTextArea
  private newTypeButton: JButton*/

  constructor(
    protected controller: UFOPlatformController,
    /**
     * The data. Will be modified if ok, or not if cancelled
     */
    protected data: MetaField) {
    super()
    const layout = new SpringLayout()
    this.setLayout(layout)

    const nameLabel = new JLabel("Name")
    this.nameTextfield = new JTextField(this.data.getName())
    const typeLabel = new JLabel("Type")
    this.typeCombo = this.createTypeCombo(controller)
    const selectedType = this.data.getType() == null ? controller.getDefaultFieldType() : this.data.getType()
    this.typeCombo.setSelectedItem(selectedType)
    this.add(nameLabel)
    this.add(this.nameTextfield)
    this.add(typeLabel)
    this.add(this.typeCombo)
    layout.putConstraint(SpringLayoutDirection.EAST, this, 5, SpringLayoutDirection.EAST, this.typeCombo)
    layout.putConstraint(SpringLayoutDirection.SOUTH, this, 5, SpringLayoutDirection.SOUTH, this.typeCombo)
    layout.putConstraint(SpringLayoutDirection.EAST, this.nameTextfield, 5, SpringLayoutDirection.EAST, this.typeCombo)
    layout.putConstraint(SpringLayoutDirection.WEST, nameLabel, 5, SpringLayoutDirection.WEST, this)
    layout.putConstraint(SpringLayoutDirection.NORTH, nameLabel, 5, SpringLayoutDirection.NORTH, this)
    layout.putConstraint(SpringLayoutDirection.WEST, this.nameTextfield, 5, SpringLayoutDirection.EAST, nameLabel)
    layout.putConstraint(SpringLayoutDirection.NORTH, this.nameTextfield, 0, SpringLayoutDirection.NORTH, nameLabel)
    layout.putConstraint(SpringLayoutDirection.WEST, typeLabel, 0, SpringLayoutDirection.WEST, nameLabel)
    layout.putConstraint(SpringLayoutDirection.NORTH, typeLabel, 5, SpringLayoutDirection.SOUTH, nameLabel)
    layout.putConstraint(SpringLayoutDirection.WEST, this.typeCombo, 0, SpringLayoutDirection.WEST, this.nameTextfield)
    layout.putConstraint(SpringLayoutDirection.NORTH, this.typeCombo, 5, SpringLayoutDirection.SOUTH, this.nameTextfield)
  }

  requestFocusInWindow(): boolean {
    return this.nameTextfield.requestFocusInWindow()
  }

  ok(): void {
    this.data.setName(this.nameTextfield.getText())
    this.data.setType(this.typeCombo.getSelectedItem() as MetaType)
  }
}
