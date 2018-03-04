package org.ufomatics.archipelago.model;

import org.ufomatics.archipelago.view.swing.MainFrame;
import org.ufomatics.archipelago.control.UFOPlatformControllerImpl;
import org.ufomatics.archipelago.util.Localizer;
import org.ufomatics.archipelago.util.LocalizerImpl;

/**
 * @author Jérôme Beau
 * @version 7 mai 2006 16:30:14
 */
public class Main {
    private static boolean gui = true;
    private static UFOPlatformControllerImpl controller;

    public static void main(String[] args) {
        initController(args);
        if (gui) {
            setupGUI(controller);
            welcome();
        }
    }

    private static void welcome() {
    }

    private static void initController(String[] args) {
        Localizer localizer = new LocalizerImpl(args);
        try {
            Class.forName("org.rr0.database.archipelago.RR0DatabaseAdapter");
            Class.forName("org.rr0.database.archipelago.OVNIFranceDatabaseAdapter");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        controller = new UFOPlatformControllerImpl(localizer);
    }

    private static void setupGUI(UFOPlatformControllerImpl controller) {
        MainFrame mainFrame = new MainFrame(controller);
        mainFrame.pack();
        mainFrame.setVisible(true);
    }
}
