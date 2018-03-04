package org.ufomatics.archipelago.view.swing;

import org.ufomatics.archipelago.control.UFOPlatformController;

import javax.swing.*;

public class PreferencesDialog extends JDialog {
    private JButton buttonOK;
    private JButton buttonCancel;
    private JCheckBox confimEixtCheckBox;
    private UFOPlatformController controller;

    public PreferencesDialog(MainFrame mainFrame, UFOPlatformController controller) {
        super (mainFrame, true);
        this.controller = controller;
    }
    
    public void setData(MainFrame data) {
        confimEixtCheckBox.setSelected(data.isCheckExitConfirmation());
    }

    public void getData(MainFrame data) {
        data.setCheckExitConfirmation(confimEixtCheckBox.isSelected());
    }

    public boolean isModified(MainFrame data) {
        if (confimEixtCheckBox.isSelected() != data.isCheckExitConfirmation()) return true;
        return false;
    }
}
