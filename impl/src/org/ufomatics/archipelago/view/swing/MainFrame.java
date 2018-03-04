package org.ufomatics.archipelago.view.swing;

import org.ufomatics.archipelago.control.UFOPlatformController;
import org.ufomatics.archipelago.model.*;

import javax.swing.*;
import javax.swing.filechooser.FileFilter;
import javax.swing.tree.*;
import java.io.File;
import java.io.IOException;
import java.util.ResourceBundle;
import java.util.Set;
import java.awt.*;
import java.awt.event.*;

/**
 * User: Jérôme Beau
 * Date: 7 mai 2006
 * Time: 16:23:59
 */
public class MainFrame extends JFrame {
    private UFOPlatformController controller;
    private Action exitAction;
    private boolean checkExitConfirmation = false;
    private AddDatasourceAction addDatasourceAction;
    private PreferencesAction preferencesAction;
    private AboutAction aboutAction;
    private SaveMetamodelAction saveAction;
    private SaveMetamodelAsAction saveAsAction;
    private String currentMetamodelFilename;
    private int metamodelMenuIndex;
    private int databaseMenuIndex;
    private JSplitPane splitPane;
    private AddClassAction addClassAction;
    private AddFieldAction addFieldAction;
    private AddFunctionAction addFunctionAction;
    private DefaultTreeModel metaModelTreeModel;
    private JTree modelTree;
    private OpenMetamodelAction openMetaModelAction;
    private DefaultMutableTreeNode rootNode;
    private JPanel contents;
    private int fileMenuIndex;
    private static ResourceBundle resourceBundle;

    public static ResourceBundle getBundle() {
        if (resourceBundle == null) {
            resourceBundle = ResourceBundle.getBundle("org.ufomatics.archipelago.view.Archipelago");
        }
        return resourceBundle;
    }

    public MainFrame(final UFOPlatformController controller) throws HeadlessException {
        super(getBundle().getString("MainFrame.title"));
        this.controller = controller;

        rootNode = new DefaultMutableTreeNode(resourceBundle.getString("MetaModel"));
        metaModelTreeModel = new DefaultTreeModel(rootNode);
        modelTree = new JTree(metaModelTreeModel);
        modelTree.setShowsRootHandles(true);
        modelTree.putClientProperty("JTree.lineStyle", "Angled");
        Font treeFont = modelTree.getFont();
        final Font typeFont = treeFont.deriveFont(Font.BOLD);
        final Font fieldFont = treeFont.deriveFont(Font.PLAIN);
        final Font functionFont = treeFont.deriveFont(Font.ITALIC);
        DefaultTreeCellRenderer renderer = new DefaultTreeCellRenderer() {
            public Component getTreeCellRendererComponent(JTree tree, Object value, boolean sel, boolean expanded, boolean leaf, int row, boolean hasFocus) {
                Component comp = super.getTreeCellRendererComponent(tree, value, sel, expanded, leaf, row, hasFocus);
                Object userObject = ((DefaultMutableTreeNode) value).getUserObject();
                if (userObject instanceof MetaType) {
                    comp.setFont(typeFont);
                } else if (userObject instanceof MetaField) {
                    comp.setFont(fieldFont);
                } else if (userObject instanceof MetaFunction) {
                    comp.setFont(functionFont);
                }
                return comp;
            }
        };
        renderer.setLeafIcon(null);
        renderer.setClosedIcon(null);
        renderer.setOpenIcon(null);
        modelTree.setCellRenderer(renderer);

        exitAction = new ExitAction();
        setupMenuBar();

        final JPopupMenu popup = new JPopupMenu();
        popup.add(new JMenuItem(addClassAction));
        popup.add(new JMenuItem(addFieldAction));
        popup.add(new JMenuItem(addFunctionAction));
        popup.add(new JSeparator());
        popup.add(new JMenuItem("Remove"));
        modelTree.addMouseListener(new MouseAdapter() {
            public void mousePressed(MouseEvent e) {
                if (e.isPopupTrigger()) {
                    handlePopup(e);
                }
            }

            public void mouseReleased(MouseEvent e) {
                if (e.isPopupTrigger()) {
                    handlePopup(e);
                } else if (e.getClickCount() == 2) {
                    DefaultMutableTreeNode node = getSelectedNode(e);
                    if (node != null) {
                        Object o = node.getUserObject();
                        if (o instanceof MetaType) {
                            MetaType type = (MetaType) o;
                            TypePane pane = new TypePane(controller, type);
                            contents.removeAll();
                            contents.setBackground(pane.getBackground());
                            contents.add(pane, BorderLayout.NORTH);
                            JComponent mappingPanel = getMappingTabbedPane(controller);
                            contents.add(mappingPanel, BorderLayout.CENTER);
                            contents.validate();
                            pane.requestFocusInWindow();
                        } else if (o instanceof MetaField) {
                            MetaField field = (MetaField) o;
                            final FieldPane pane = new FieldPane(controller, field);
                            pane.addFocusListener(new FocusAdapter() {
                                public void focusLost(FocusEvent e) {
                                    pane.ok();
                                    System.out.println("e = " + e);
                                }
                            });
                            contents.removeAll();
                            contents.setBackground(pane.getBackground());
                            contents.add(pane, BorderLayout.NORTH);
                            JComponent mappingPanel = getMappingTabbedPane(controller);
                            contents.add(mappingPanel, BorderLayout.CENTER);
                            contents.validate();
                            pane.requestFocusInWindow();
                        }
                    }
                }
            }

            private JComponent getMappingTabbedPane(UFOPlatformController controller) {
                JComponent mappingPane;
                Set<Database> datasources = controller.getDatasources();
                if (! datasources.isEmpty()) {
                    JTabbedPane mappingPanel = new JTabbedPane();
                    for (Database datasource : datasources) {
                        JPanel databaseMappingPanel = new JPanel();
                        mappingPanel.addTab(datasource.getName(), null, databaseMappingPanel, datasource.getName());

                        MetaModel dataModel = datasource.getDataModel();
                        DefaultMutableTreeNode rootNode = new DefaultMutableTreeNode(resourceBundle.getString("DataModel"));
                        DefaultTreeModel metaModelTreeModel = new DefaultTreeModel(rootNode);
                        JTree modelTree = new JTree(metaModelTreeModel);
                        modelTree.setShowsRootHandles(true);
                        modelTree.putClientProperty("JTree.lineStyle", "Angled");
                        loadMetaData(dataModel, metaModelTreeModel, modelTree);
                        databaseMappingPanel.add(modelTree);
                    }
                    mappingPane = mappingPanel;
                } else {
                    mappingPane = new JPanel();
                    mappingPane.add(new JButton (addDatasourceAction));
                }
                return mappingPane;
            }

            private void handlePopup(MouseEvent e) {
                DefaultMutableTreeNode node = getSelectedNode(e);
                if (node != null) {
                    Object o = node.getUserObject();
                    addClassAction.setEnabled(node == rootNode);
                    addFunctionAction.setEnabled(node == rootNode);
                    addFieldAction.setEnabled(o instanceof MetaType);
                    popup.show(e.getComponent(), e.getX(), e.getY());
                }
            }

            private DefaultMutableTreeNode getSelectedNode(MouseEvent e) {
                DefaultMutableTreeNode node;
                TreePath path = modelTree.getPathForLocation(e.getX(), e.getY());
                if (path != null) {
                    node = (DefaultMutableTreeNode) path.getLastPathComponent();
                } else {
                    node = null;
                }
                return node;
            }
        });

        contents = new JPanel(new BorderLayout());
        contents.setBackground(Color.GRAY);
        contents.setPreferredSize(new Dimension(800, 600));
        splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, modelTree, contents);

        getContentPane().add(splitPane);

        loadMetaData(controller.getMetaModel(), metaModelTreeModel, modelTree);
    }

    private void loadMetaData(MetaModel model, DefaultTreeModel treeModel, JTree tree) {
        clearTree(treeModel, tree);
        loadTree(model, treeModel);
    }

    private void loadTree(MetaModel model, DefaultTreeModel treeModel) {
        Set<MetaType> metaTypes = model.getClasses();
        for (MetaType metaType : metaTypes) {
            DefaultMutableTreeNode metaTypeNode = new DefaultMutableTreeNode(metaType);
            ((DefaultMutableTreeNode) treeModel.getRoot()).add(metaTypeNode);
            for (MetaField metaField : metaType.getFields()) {
                MutableTreeNode metaFieldNode = new DefaultMutableTreeNode(metaField);
                metaTypeNode.add(metaFieldNode);
            }
        }
        Set<MetaFunction> functions = model.getFunctions();
        for (MetaFunction metaFunction : functions) {
            DefaultMutableTreeNode functionNode = new DefaultMutableTreeNode(metaFunction);
            ((DefaultMutableTreeNode) treeModel.getRoot()).add(functionNode);
            for (MetaField parameter : metaFunction.getParameters()) {
                MutableTreeNode parameterNode = new DefaultMutableTreeNode(parameter);
                functionNode.add(parameterNode);
            }
        }
        treeModel.reload();
    }

    private void clearTree(DefaultTreeModel treeModel, JTree tree) {
        MutableTreeNode root = (MutableTreeNode) treeModel.getRoot();
        int max = root.getChildCount();
        for (int i = 0; i < max; i++) {
            root.remove(0);
        }
        tree.removeAll();
    }

    public void setVisible(boolean b) {
        super.setVisible(b);
        Rectangle screenBounds = getGraphicsConfiguration().getBounds();
        setLocation((int) (screenBounds.getCenterX() - getSize().getWidth() / 2), (int) (screenBounds.getCenterY() - getSize().getHeight() / 2));
    }

    private void setupMenuBar() {
        JMenuBar menuBar = new JMenuBar();

        fileMenuIndex = menuBar.getMenuCount();
        menuBar.add(fileMenu());

        metamodelMenuIndex = menuBar.getMenuCount();
        menuBar.add(metamodelMenu());

        databaseMenuIndex = menuBar.getMenuCount();
        menuBar.add(databaseMenu());

        menuBar.add(helpMenu());
        setJMenuBar(menuBar);
    }

    private JMenu metamodelMenu() {
        JMenu menu = new JMenu(getBundle().getString("MetaModel"));

        addClassAction = new AddClassAction();
        menu.add(new JMenuItem(addClassAction));

        addFieldAction = new AddFieldAction();
        menu.add(new JMenuItem(addFieldAction));

        addFunctionAction = new AddFunctionAction();
        menu.add(new JMenuItem(addFunctionAction));

        return menu;
    }

    private JMenu databaseMenu() {
        JMenu dataMenu = new JMenu(resourceBundle.getString("Datasources"));
        Set<Database> datasources = controller.getDatasources();
        for (Database datasource : datasources) {
            JMenu datasourceMenu = new JMenu(datasource.getName());
            JMenuItem editMappingItem = new JMenuItem("Edit mapping...");
            editMappingItem.setEnabled(controller.hasMetaModel());
            datasourceMenu.add(editMappingItem);
            dataMenu.add(datasourceMenu);
        }
        dataMenu.add(new JSeparator());
        addDatasourceAction = new AddDatasourceAction();
        dataMenu.add(new JMenuItem(addDatasourceAction));
        return dataMenu;
    }

    private JMenu helpMenu() {
        JMenu menu = new JMenu(resourceBundle.getString("Help"));
        menu.add(new JMenuItem("Search"));
        menu.add(new JMenuItem("Contents"));
        menu.add(new JSeparator());
        aboutAction = new AboutAction();
        menu.add(new JMenuItem(aboutAction));
        return menu;
    }

    private JMenu fileMenu() {
        JMenu menu = new JMenu(resourceBundle.getString("File"));
        openMetaModelAction = new OpenMetamodelAction();
        menu.add(new JMenuItem(openMetaModelAction));

        saveAction = new SaveMetamodelAction();
        menu.add(new JMenuItem(saveAction));

        saveAsAction = new SaveMetamodelAsAction();
        menu.add(new JMenuItem(saveAsAction));

        JMenu recentFilesSubMenu = new JMenu(resourceBundle.getString("RecentFiles"));
        Set<String> recentFiles = controller.getRecentFiles();
        if (!recentFiles.isEmpty()) {
            for (String recentFile : recentFiles) {
                JMenuItem editMappingItem = new JMenuItem(recentFile);
                recentFilesSubMenu.add(editMappingItem);
//                recentFilesSubMenu.setEnabled(true);
            }
        } else {
//            recentFilesSubMenu.setEnabled(false);
        }
        menu.add(recentFilesSubMenu);

        menu.add(new JSeparator());

        preferencesAction = new PreferencesAction();
        menu.add(new JMenuItem(preferencesAction));
        menu.add(new JSeparator());
        menu.add(new JMenuItem(exitAction));
        return menu;
    }

    protected void processWindowEvent(WindowEvent e) {
        if (e.getID() == WindowEvent.WINDOW_CLOSING) {
            exitAction.actionPerformed(new ActionEvent(this, 0, null));
        }
    }

    private class AddDatasourceAction extends AbstractAction {

        public AddDatasourceAction() {
            super(resourceBundle.getString("Datasource.add"));
            putValue(SHORT_DESCRIPTION, "Define a new datasource");
        }

        public void actionPerformed(ActionEvent e) {
            Database newDatasource = controller.createDatasource();
            DatasourcePane pane = new DatasourcePane(controller, newDatasource);
            int choosenOption = JOptionPane.showOptionDialog(MainFrame.this, pane, (String) getValue(SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, newDatasource);
            if (choosenOption == JOptionPane.OK_OPTION) {
                pane.ok();
                controller.addDatasource(newDatasource);
//            modelTree.setSelectionPath(path);
                setModified();
            }
            getJMenuBar().remove(databaseMenuIndex);
            getJMenuBar().add(databaseMenu(), databaseMenuIndex);
            getJMenuBar().validate();
        }
    }

    private class OpenMetamodelAction extends AbstractAction {
        JFileChooser openDialog;

        public OpenMetamodelAction() {
            super(resourceBundle.getString("File.open"));
            openDialog = new JFileChooser();
            FileFilter filter = new FileFilter() {
                public boolean accept(File f) {
                    return f.getAbsolutePath().endsWith(".xml");
                }

                public String getDescription() {
                    return "Archipelago metamodel XML files";
                }
            };
            openDialog.setFileFilter(filter);
            putValue(SHORT_DESCRIPTION, "Open an existing metamodel file");
        }

        private void loadMetaModel(String name) {
            try {
                controller.loadMetaMapping(name);
            } catch (MetaException e) {
                JOptionPane.showMessageDialog(MainFrame.this, e.getMessage(), "Error while loading ", JOptionPane.ERROR_MESSAGE);
            }
        }

        public void actionPerformed(ActionEvent e) {
            int returnVal = openDialog.showOpenDialog(MainFrame.this);
            if (returnVal == JFileChooser.APPROVE_OPTION) {
                loadMetaModel(openDialog.getSelectedFile().getAbsolutePath());
                MainFrame.this.loadMetaData(MainFrame.this.controller.getMetaModel(), MainFrame.this.metaModelTreeModel, MainFrame.this.modelTree);
            }
        }
    }

    private class SaveMetamodelAction extends AbstractAction {

        public SaveMetamodelAction() {
            super(resourceBundle.getString("File.save"));
            putValue(SHORT_DESCRIPTION, "Save the current metamodel");
            setEnabled(controller.hasMetaModel());
        }

        public void actionPerformed(ActionEvent e) {
            if (currentMetamodelFilename == null) {
                saveAsAction.actionPerformed(e);
            } else {
                try {
                    controller.saveMetaMapping(currentMetamodelFilename);
                } catch (IOException e1) {
                    e1.printStackTrace();
                    JOptionPane.showMessageDialog(MainFrame.this, e1.getMessage());
                }
            }
        }
    }

    private class SaveMetamodelAsAction extends AbstractAction {
        private JFileChooser saveDialog;

        public SaveMetamodelAsAction() {
            super(resourceBundle.getString("File.saveAs"));
            putValue(SHORT_DESCRIPTION, "Save the current metamodel in a given file");
            setEnabled(controller.hasMetaModel());

            saveDialog = new JFileChooser();
            FileFilter filter = new FileFilter() {
                public boolean accept(File f) {
                    return f.getAbsolutePath().endsWith(".xml");
                }

                public String getDescription() {
                    return "Archipelago metamodel XML files";
                }
            };
            saveDialog.setFileFilter(filter);
        }

        public void actionPerformed(ActionEvent e) {
            int returnVal = saveDialog.showOpenDialog(MainFrame.this);
            if (returnVal == JFileChooser.APPROVE_OPTION) {
                try {
                    currentMetamodelFilename = saveDialog.getSelectedFile().getAbsolutePath();
                    controller.saveMetaMapping(currentMetamodelFilename);
                } catch (IOException e1) {
                    e1.printStackTrace();
                    JOptionPane.showMessageDialog(MainFrame.this, e1.getMessage());
                }
            }
        }
    }

    private class PreferencesAction extends AbstractAction {
        PreferencesDialog newDatasourceDialog = new PreferencesDialog(MainFrame.this, controller);

        public PreferencesAction() {
            super("Preferences");
            putValue(SHORT_DESCRIPTION, "Setup application preferences");
        }

        public void actionPerformed(ActionEvent e) {
            newDatasourceDialog.pack();
            newDatasourceDialog.setVisible(true);
        }
    }

    private class ExitAction extends AbstractAction {

        public ExitAction() {
            super(resourceBundle.getString("File.exit"));
            putValue(SHORT_DESCRIPTION, "Exit the application");
        }

        public void actionPerformed(ActionEvent e) {
            if (exitConfirmation()) {
                controller.close();
                dispose();
                System.exit(0);
            }
        }

        private boolean exitConfirmation() {
            return !checkExitConfirmation || JOptionPane.showConfirmDialog(MainFrame.this, "Are you sure ?") == 0;
        }
    }

    private class AddClassAction extends AbstractAction {
        public AddClassAction() {
            super(resourceBundle.getString("MetaType.add"));
            putValue(SHORT_DESCRIPTION, "Add a new type to the metamodel");
        }

        public void actionPerformed(ActionEvent e) {
            MetaType newMetaType = controller.getMetaModel().createType();
            TypePane typePane = new TypePane(controller, newMetaType);
            int choosenOption = JOptionPane.showOptionDialog(MainFrame.this, typePane, (String) getValue(SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, newMetaType);
            if (choosenOption == JOptionPane.OK_OPTION) {
                typePane.ok();
                controller.getMetaModel().addMetaType(newMetaType);
                DefaultMutableTreeNode metaTypeNode = new DefaultMutableTreeNode(newMetaType);
                MutableTreeNode root = (MutableTreeNode) metaModelTreeModel.getRoot();
                metaModelTreeModel.insertNodeInto(metaTypeNode, root, root.getChildCount());
                Object[] pathes = metaTypeNode.getPath();
                TreePath path = new TreePath(pathes);
                modelTree.makeVisible(path);
//            modelTree.setSelectionPath(path);
                setModified();
            }
        }
    }

    private class AddFunctionAction extends AbstractAction {
        public AddFunctionAction() {
            super(resourceBundle.getString("MetaFunction.add"));
            putValue(SHORT_DESCRIPTION, "Add a new function to the metamodel");
        }

        public void actionPerformed(ActionEvent e) {
            MetaFunction metaFunction = controller.getMetaModel().createFunction();
            FunctionPane typePane = new FunctionPane(controller, metaFunction);
            int choosenOption = JOptionPane.showOptionDialog(MainFrame.this, typePane, (String) getValue(SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, metaFunction);
            if (choosenOption == JOptionPane.OK_OPTION) {
                typePane.ok();
                controller.getMetaModel().addFunction(metaFunction);
                DefaultMutableTreeNode metaTypeNode = new DefaultMutableTreeNode(metaFunction);
                MutableTreeNode root = (MutableTreeNode) metaModelTreeModel.getRoot();
                metaModelTreeModel.insertNodeInto(metaTypeNode, root, root.getChildCount());
                Object[] pathes = metaTypeNode.getPath();
                TreePath path = new TreePath(pathes);
                modelTree.makeVisible(path);
//            modelTree.setSelectionPath(path);
                setModified();
            }
        }
    }

    private class AddFieldAction extends AbstractAction {

        public AddFieldAction() {
            super(resourceBundle.getString("MetaField.add"));
            putValue(SHORT_DESCRIPTION, "Add a new field to this class");
        }

        public void actionPerformed(ActionEvent e) {
            Object lastSelectedComponent = modelTree.getLastSelectedPathComponent();
            if (lastSelectedComponent instanceof DefaultMutableTreeNode) {
                DefaultMutableTreeNode metaTypeNode = (DefaultMutableTreeNode) lastSelectedComponent;
                MetaType metaType = (MetaType) metaTypeNode.getUserObject();
                MetaField metaField = metaType.createField();

                FieldPane fieldPane = new FieldPane(controller, metaField);
                int choosenOption = JOptionPane.showOptionDialog(MainFrame.this, fieldPane, (String) getValue(SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, metaField);
                if (choosenOption == JOptionPane.OK_OPTION) {
                    fieldPane.ok();
                    metaType.addField(metaField);
                    DefaultMutableTreeNode fieldNode = new DefaultMutableTreeNode(metaField);
                    metaModelTreeModel.insertNodeInto(fieldNode, metaTypeNode, metaTypeNode.getChildCount());
                    Object[] pathes = fieldNode.getPath();
                    TreePath path = new TreePath(pathes);
                    modelTree.makeVisible(path);
                    setModified();
                }
            } else {
                JOptionPane.showMessageDialog(MainFrame.this, resourceBundle.getString("SelectATypeNodeFirst"));
            }
        }
    }

    private void setModified() {
        saveAction.setEnabled(true);
        saveAsAction.setEnabled(true);
    }

    private class AboutAction extends AbstractAction {

        public AboutAction() {
            super(resourceBundle.getString("About"));
            putValue(SHORT_DESCRIPTION, "About his application");
        }

        public void actionPerformed(ActionEvent e) {
            JOptionPane.showMessageDialog(MainFrame.this, "Archipelago 1.0a\n(c) 2006 Jérôme Beau\nGNU Licensed");
        }
    }

    public boolean isCheckExitConfirmation() {
        return checkExitConfirmation;
    }

    public void setCheckExitConfirmation(boolean checkExitConfirmation) {
        this.checkExitConfirmation = checkExitConfirmation;
    }
}
