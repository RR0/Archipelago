package org.ufomatics.archipelago.view.swing;

import org.ufomatics.archipelago.model.MetaType;
import org.ufomatics.archipelago.model.MetaFunction;
import org.ufomatics.archipelago.control.UFOPlatformController;

import javax.swing.*;

public class FunctionPane extends AbstractPane {
    /**
     * The data. Will be modified if ok, or not if cancelled
     */
    private MetaFunction data;

    private JTextField nameTextfield;
    private JComboBox typeCombo;
    private JTextArea descriptionTextarea;

    private UFOPlatformController controller;

    public FunctionPane(UFOPlatformController controller, MetaFunction data) {
        this.controller = controller;
        this.data = data;

        SpringLayout layout = new SpringLayout();
        setLayout(layout);

        JLabel nameLabel = new JLabel("Name");
        nameTextfield = new JTextField(data.getName());
        JLabel typeLabel = new JLabel("Return type");
        typeCombo = createTypeCombo(controller);
        MetaType selectedType = data.getReturnType() == null ? controller.getDefaultFieldType() : data.getReturnType();
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
        data.setReturnType((MetaType) typeCombo.getSelectedItem());
    }
}
