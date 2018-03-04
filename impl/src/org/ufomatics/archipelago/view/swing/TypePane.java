package org.ufomatics.archipelago.view.swing;

import org.ufomatics.archipelago.control.UFOPlatformController;
import org.ufomatics.archipelago.model.MetaType;

import javax.swing.*;
import java.util.Set;

public class TypePane extends JPanel {
    /**
     * The data. Will be modified if ok, or not if cancelled
     */
    private MetaType data;

    private JTextField nameTextfield;
    private JTextArea descriptionTextarea;
    private JTextField ancestorsTextfield;
    private JButton button1;
    private Set ancestors;

    private UFOPlatformController controller;

    public TypePane(UFOPlatformController controller, MetaType data) {
        this.controller = controller;
        this.data = data;

        SpringLayout layout = new SpringLayout();
        setLayout(layout);

        JLabel nameLabel = new JLabel("Name");
        nameTextfield = new JTextField(data.getName());
        add(nameLabel);
        add(nameTextfield);
        layout.putConstraint(SpringLayout.EAST, this, 5, SpringLayout.EAST, nameTextfield);
        layout.putConstraint(SpringLayout.SOUTH, this, 5, SpringLayout.SOUTH, nameTextfield);
        layout.putConstraint(SpringLayout.WEST, nameLabel, 5, SpringLayout.WEST, this);
        layout.putConstraint(SpringLayout.NORTH, nameLabel, 5, SpringLayout.NORTH, this);
        layout.putConstraint(SpringLayout.WEST, nameTextfield, 5, SpringLayout.EAST, nameLabel);
        layout.putConstraint(SpringLayout.NORTH, nameTextfield, 0, SpringLayout.NORTH, nameLabel);
    }

    public boolean requestFocusInWindow() {
        return nameTextfield.requestFocusInWindow();
    }

    public void ok() {
        data.setName(nameTextfield.getText());
    }
}
