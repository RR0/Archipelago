package org.ufomatics.archipelago.view.swing;

import org.ufomatics.archipelago.control.UFOPlatformController;
import org.ufomatics.archipelago.model.MetaType;

import javax.swing.*;

/**
 * @author Jérôme Beau
 * @version 10 juin 2006 22:29:04
 */
public class AbstractPane extends JPanel {
    protected JComboBox createTypeCombo(final UFOPlatformController controller) {
        JComboBox comboBox = new JComboBox(new DefaultComboBoxModel() {
            public Object getElementAt(int index) {
                int i = 0;
                for (MetaType metaType : controller.getMetaModel().getClasses()) {
                    if (i == index) {
                        return metaType;
                    }
                    i++;
                }
                return "<Undefined>";
            }

            // implements javax.swing.ListModel
            public int getSize() {
                return controller.getMetaModel().getClasses().size();
            }
        });
        return comboBox;
    }
}
