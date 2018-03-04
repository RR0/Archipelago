package org.ufomatics.archipelago.view.swing;

import org.ufomatics.archipelago.control.UFOPlatformController;
import org.ufomatics.archipelago.model.MetaField;
import org.ufomatics.archipelago.model.MetaType;

import javax.swing.*;

public class FieldPane extends AbstractPane {
    /**
     * The data. Will be modified if ok, or not if cancelled
     */
    private MetaField data;

    private JTextField nameTextfield;
    private JComboBox typeCombo;
    private JTextArea descriptionTextarea;

    private JButton newTypeButton;

    private UFOPlatformController controller;

    public FieldPane(UFOPlatformController controller, MetaField field) {
        this.controller = controller;
        this.data = field;

        SpringLayout layout = new SpringLayout();
        setLayout(layout);

        JLabel nameLabel = new JLabel("Name");
        nameTextfield = new JTextField(field.getName());
        JLabel typeLabel = new JLabel("Type");
        typeCombo = createTypeCombo(controller);
        MetaType selectedType = field.getType() == null ? controller.getDefaultFieldType() : field.getType();
        typeCombo.setSelectedItem(selectedType);
        add(nameLabel);
        add(nameTextfield);
        add(typeLabel);
        add(typeCombo);
        layout.putConstraint(SpringLayout.EAST, this, 5, SpringLayout.EAST, typeCombo);
        layout.putConstraint(SpringLayout.SOUTH, this, 5, SpringLayout.SOUTH, typeCombo);
        layout.putConstraint(SpringLayout.EAST, nameTextfield, 5, SpringLayout.EAST, typeCombo);
        layout.putConstraint(SpringLayout.WEST, nameLabel, 5, SpringLayout.WEST, this);
        layout.putConstraint(SpringLayout.NORTH, nameLabel, 5, SpringLayout.NORTH, this);
        layout.putConstraint(SpringLayout.WEST, nameTextfield, 5, SpringLayout.EAST, nameLabel);
        layout.putConstraint(SpringLayout.NORTH, nameTextfield, 0, SpringLayout.NORTH, nameLabel);
        layout.putConstraint(SpringLayout.WEST, typeLabel, 0, SpringLayout.WEST, nameLabel);
        layout.putConstraint(SpringLayout.NORTH, typeLabel, 5, SpringLayout.SOUTH, nameLabel);
        layout.putConstraint(SpringLayout.WEST, typeCombo, 0, SpringLayout.WEST, nameTextfield);
        layout.putConstraint(SpringLayout.NORTH, typeCombo, 5, SpringLayout.SOUTH, nameTextfield);
    }

    public boolean requestFocusInWindow() {
        return nameTextfield.requestFocusInWindow();
    }

    public void ok() {
        data.setName(nameTextfield.getText());
        data.setType((MetaType) typeCombo.getSelectedItem());
    }
}
