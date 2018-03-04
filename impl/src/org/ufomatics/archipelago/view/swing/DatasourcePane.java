package org.ufomatics.archipelago.view.swing;

import org.ufomatics.archipelago.control.UFOPlatformController;
import org.ufomatics.archipelago.model.DatabaseAdapter;
import org.ufomatics.archipelago.model.Database;

import javax.swing.*;
import java.util.List;
import java.util.ArrayList;

public class DatasourcePane extends JPanel {
    private JTextField nameTextfield;
    private JComboBox adaptersCombo;
    private UFOPlatformController controller;
    private Database datasource;

    public DatasourcePane(UFOPlatformController controller, Database datasource) {
        SpringLayout layout = new SpringLayout();
        setLayout(layout);

        this.controller = controller;
        this.datasource = datasource;

        createAdaptersCombo(controller);

        JLabel nameLabel = new JLabel("Name");
        nameTextfield = new JTextField(datasource.getName());
        JLabel typeLabel = new JLabel("Adapter");
        adaptersCombo = createAdaptersCombo(controller);
        DatabaseAdapter selectedType = datasource.getAdapter() == null ? controller.getDefaultAdapter() : datasource.getAdapter();
        adaptersCombo.setSelectedItem(selectedType);
        add(nameLabel);
        add(nameTextfield);
        add(typeLabel);
        add(adaptersCombo);
        layout.putConstraint(SpringLayout.EAST, this, 5, SpringLayout.EAST, adaptersCombo);
        layout.putConstraint(SpringLayout.SOUTH, this, 5, SpringLayout.SOUTH, adaptersCombo);
        layout.putConstraint(SpringLayout.EAST, nameTextfield, 5, SpringLayout.EAST, adaptersCombo);
        layout.putConstraint(SpringLayout.WEST, nameLabel, 5, SpringLayout.WEST, this);
        layout.putConstraint(SpringLayout.NORTH, nameLabel, 5, SpringLayout.NORTH, this);
        layout.putConstraint(SpringLayout.WEST, nameTextfield, 5, SpringLayout.EAST, typeLabel);
        layout.putConstraint(SpringLayout.NORTH, nameTextfield, 0, SpringLayout.NORTH, nameLabel);
        layout.putConstraint(SpringLayout.WEST, typeLabel, 0, SpringLayout.WEST, nameLabel);
        layout.putConstraint(SpringLayout.NORTH, typeLabel, 5, SpringLayout.SOUTH, nameLabel);
        layout.putConstraint(SpringLayout.WEST, adaptersCombo, 5, SpringLayout.EAST, typeLabel);
        layout.putConstraint(SpringLayout.NORTH, adaptersCombo, 5, SpringLayout.SOUTH, nameTextfield);
    }

    private JComboBox createAdaptersCombo(UFOPlatformController controller) {
        JComboBox adaptersCombo = new JComboBox();
        final List<String> adapters = new ArrayList<String>();
        for (DatabaseAdapter adapter : controller.getAdapters()) {
            adapters.add(adapter.getName());
        }
        adaptersCombo.setModel(new DefaultComboBoxModel(){
            public Object getElementAt(int index) {
                return adapters.get(index);
            }
            public int getSize() {
                return adapters.size();
            }
        });
        return adaptersCombo;
    }

    public void ok() {
        Object selectedItem = adaptersCombo.getSelectedItem();
        for (DatabaseAdapter adapter : controller.getAdapters()) {
            if (selectedItem.equals (adapter.getName())) {
                datasource.setAdapter(adapter);
                break;
            }
        }
        datasource.setName(nameTextfield.getText());
    }
}
