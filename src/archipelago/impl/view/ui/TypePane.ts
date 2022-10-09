import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {MetaType} from "archipelago/api/model/MetaType"
import {JLabel, JPanel, JTextField, SpringLayout} from "ts-jsdk"
import {SpringLayoutDirection} from "ts-jsdk/dist/awt/SpringLayout"

export class TypePane extends JPanel {

  private readonly nameTextfield: JTextField

  /* private descriptionTextarea: JTextArea
   private ancestorsTextfield: JTextField
   private button1: JButton
   private ancestors = new Set()*/

  constructor(
    protected controller: UFOPlatformController,
    /**
     * The data. Will be modified if ok, or not if cancelled
     */
    protected data: MetaType
  ) {
    super()
    const layout = new SpringLayout()
    this.setLayout(layout)

    const nameLabel = new JLabel("Name")
    this.nameTextfield = new JTextField(data.getName())
    this.add(nameLabel)
    this.add(this.nameTextfield)
    layout.putConstraint(SpringLayoutDirection.EAST, this, 5, SpringLayoutDirection.EAST, this.nameTextfield)
    layout.putConstraint(SpringLayoutDirection.SOUTH, this, 5, SpringLayoutDirection.SOUTH, this.nameTextfield)
    layout.putConstraint(SpringLayoutDirection.WEST, nameLabel, 5, SpringLayoutDirection.WEST, this)
    layout.putConstraint(SpringLayoutDirection.NORTH, nameLabel, 5, SpringLayoutDirection.NORTH, this)
    layout.putConstraint(SpringLayoutDirection.WEST, this.nameTextfield, 5, SpringLayoutDirection.EAST, nameLabel)
    layout.putConstraint(SpringLayoutDirection.NORTH, this.nameTextfield, 0, SpringLayoutDirection.NORTH, nameLabel)
  }

  requestFocusInWindow(): boolean {
    return this.nameTextfield.requestFocusInWindow()
  }

  ok(): void {
    this.data.setName(this.nameTextfield.getText())
  }
}
