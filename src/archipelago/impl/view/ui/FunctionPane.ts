import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {MetaFunction} from "archipelago/api/model/MetaFunction"
import {MetaType} from "archipelago/api/model/MetaType"
import {AbstractPane} from "archipelago/impl/view/ui/AbstractPane"
import {SpringLayoutDirection} from "ts-jsdk/dist/awt/SpringLayout"
import {JComboBox, JLabel, JTextField, SpringLayout} from "ts-jsdk"

export class FunctionPane extends AbstractPane {

  private readonly nameTextfield: JTextField
  private readonly typeCombo: JComboBox

  //private descriptionTextarea: JTextArea

  constructor(
    protected controller: UFOPlatformController,
    /**
     * The data. Will be modified if ok, or not if cancelled
     */
    protected data: MetaFunction
  ) {
    super()
    const layout = new SpringLayout()
    this.setLayout(layout)

    const nameLabel = new JLabel("Name")
    this.nameTextfield = new JTextField(data.getName())
    const typeLabel = new JLabel("Return type")
    this.typeCombo = this.createTypeCombo(controller)
    const selectedType = data.getReturnType() == null ? controller.getDefaultFieldType() : data.getReturnType()
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
    this.data.setReturnType(this.typeCombo.getSelectedItem() as MetaType)
  }
}
