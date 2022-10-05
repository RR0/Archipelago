import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {ResourceBundle} from "archipelago/api/util/jsdk/util/ResourceBundle"
import {MetaType} from "archipelago/api/model/MetaType"
import {AbstractAction} from "archipelago/api/util/jsdk/swing/AbstractAction"
import {ActionEvent} from "archipelago/api/util/jsdk/swing/ActionEvent"
import {FileFilter} from "archipelago/api/util/jsdk/FileFilter"
import {JFileChooser} from "archipelago/api/util/jsdk/swing/JFileChooser"
import {JOptionPane} from "archipelago/api/util/jsdk/swing/JOptionPane"
import {JFrame} from "archipelago/api/util/jsdk/swing/JFrame"
import {MetaField} from "archipelago/api/model/MetaField"
import {Action} from "archipelago/api/util/jsdk/swing/Action"
import {Font} from "archipelago/api/util/jsdk/swing/Font"
import {JPopupMenu} from "archipelago/api/util/jsdk/swing/JPopupMenu"
import {JMenuItem} from "archipelago/api/util/jsdk/swing/JMenuItem"
import {JSeparator} from "archipelago/api/util/jsdk/swing/JSeparator"
import {MouseAdapter} from "archipelago/api/util/jsdk/swing/MouseAdapter"
import {TypePane} from "archipelago/impl/view/ui/TypePane"
import {FieldPane} from "archipelago/impl/view/ui/FieldPane"
import {BorderLayout} from "archipelago/api/util/jsdk/swing/BorderLayout"
import {JComponent} from "archipelago/api/util/jsdk/swing/JComponent"
import {JPanel} from "archipelago/api/util/jsdk/swing/JPanel"
import {MetaModel} from "archipelago/api/model/MetaModel"
import {JMenu} from "archipelago/api/util/jsdk/swing/JMenu"
import {JButton} from "archipelago/api/util/jsdk/swing/JButton"
import {DatasourcePane} from "archipelago/impl/view/ui/DatasourcePane"
import {JTree} from "archipelago/api/util/jsdk/swing/JTree"
import {PreferencesDialog} from "archipelago/impl/view/ui/PreferencesDialog"
import {FunctionPane} from "archipelago/impl/view/ui/FunctionPane"
import {JDialogResult} from "archipelago/api/util/jsdk/swing/JDialog"
import {TreePath} from "archipelago/api/util/jsdk/swing/TreePath"
import {DefaultTreeModel} from "archipelago/api/util/jsdk/swing/DefaultTreeModel"
import {DefaultMutableTreeNode} from "archipelago/api/util/jsdk/swing/DefaultMutableTreeNode"
import {JMouseEvent} from "archipelago/api/util/jsdk/swing/JMouseEvent"
import {MetaTypeImpl} from "archipelago/api/model/MetaTypeImpl"
import {FocusAdapter} from "archipelago/api/util/jsdk/swing/FocusAdapter"
import {MetaFieldImpl} from "archipelago/api/model/MetaFieldImpl"
import {MetaFunctionImpl} from "archipelago/api/model/MetaFunctionImpl"
import {MutableTreeNode} from "archipelago/api/util/jsdk/swing/MutableTreeNode"
import {JMenuBar} from "archipelago/api/util/jsdk/swing/JMenuBar"
import {JTabbedPane} from "archipelago/api/util/jsdk/swing/JTabbedPane"
import {JSplitPane, JSplitPaneDirection} from "archipelago/api/util/jsdk/swing/JSplitPane"
import {DefaultTreeCellRenderer} from "archipelago/api/util/jsdk/swing/DefaultTreeCellRenderer"
import {JFile} from "archipelago/api/util/jsdk/util/JFile"
import {Color} from "archipelago/api/util/jsdk/swing/Color"
import {Dimension} from "archipelago/api/util/jsdk/swing/Dimension"
import {JWindowEvent} from "archipelago/api/util/jsdk/swing/JWindow"

class AboutAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("About"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "About his application")
  }

  actionPerformed(_e: ActionEvent) {
    JOptionPane.showMessageDialog(this.mainFrame, "Archipelago 1.0a\n(c) 2006 Jérôme Beau\nGNU Licensed")
  }
}

class AddDatasourceAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("Datasource.add"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Define a new datasource")
  }

  actionPerformed(_e: ActionEvent): void {
    const newDatasource = this.mainFrame.controller.createDatasource()
    const pane = new DatasourcePane(this.mainFrame.controller, newDatasource)
    const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, pane, this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, newDatasource)
    if (choosenOption == JDialogResult.OK_OPTION) {
      pane.ok()
      this.mainFrame.controller.addDatasource(newDatasource)
//            modelTree.setSelectionPath(path);
      this.mainFrame.setModified()
    }
    const menuBar = this.mainFrame.getJMenuBar()
    if (menuBar) {
      menuBar.remove(this.mainFrame.databaseMenuIndex)
      menuBar.add(this.mainFrame.databaseMenu(), this.mainFrame.databaseMenuIndex)
      menuBar.validate()
    }
  }
}

class OpenMetamodelAction extends AbstractAction {
  protected openDialog: JFileChooser

  public constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("File.open"))
    this.openDialog = new JFileChooser()
    const filter = new class extends FileFilter {
      accept(_f: JFile): boolean {
        return _f.getAbsolutePath().endsWith(".xml")
      }

      getDescription(): string {
        return "Archipelago metamodel XML files"
      }
    }()
    this.openDialog.setFileFilter(filter)
    mainFrame.putValue(MainFrame.SHORT_DESCRIPTION, "Open an existing metamodel file")
  }

  actionPerformed(_e: ActionEvent): void {
    const returnVal = this.openDialog.showOpenDialog(this.mainFrame)
    if (returnVal == JDialogResult.APPROVE_OPTION) {
      let selectedFile = this.openDialog.getSelectedFile()
      if (selectedFile) {
        this.loadMetaModel(selectedFile.getAbsolutePath())
        this.mainFrame.loadMetaData(this.mainFrame.controller.getMetaModel(), this.mainFrame.metaModelTreeModel, this.mainFrame.modelTree)
      }
    }
  }

  private loadMetaModel(name: string): void {
    try {
      this.mainFrame.controller.loadMetaMapping(name)
    } catch (e) {
      JOptionPane.showMessageDialog(this.mainFrame, (e as Error).message, "Error while loading ", JOptionPane.ERROR_MESSAGE)
    }
  }
}

class SaveMetamodelAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("File.save"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Save the current metamodel")
    this.mainFrame.setEnabled(this.mainFrame.controller.hasMetaModel())
  }

  public actionPerformed(e: ActionEvent): void {
    if (this.mainFrame.currentMetamodelFilename == null) {
      this.mainFrame.saveAsAction.actionPerformed(e)
    } else {
      try {
        this.mainFrame.controller.saveMetaMapping(this.mainFrame.currentMetamodelFilename)
      } catch (e1) {
        console.error(e1)
        JOptionPane.showMessageDialog(this.mainFrame, (e1 as Error).message)
      }
    }
  }
}

class SaveMetamodelAsAction extends AbstractAction {
  private saveDialog: JFileChooser

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("File.saveAs"))
    this.mainFrame.putValue(MainFrame.SHORT_DESCRIPTION, "Save the current metamodel in a given file")
    this.mainFrame.setEnabled(this.mainFrame.controller.hasMetaModel())

    this.saveDialog = new JFileChooser()
    const filter = new class extends FileFilter {
      accept(_f: JFile): boolean {
        return _f.getAbsolutePath().endsWith(".xml")
      }

      getDescription(): string {
        return "Archipelago metamodel XML files"
      }
    }()
    this.saveDialog.setFileFilter(filter)
  }

  actionPerformed(_e: ActionEvent): void {
    const returnVal = this.saveDialog.showOpenDialog(this.mainFrame)
    if (returnVal == JDialogResult.APPROVE_OPTION) {
      try {
        let selectedFile = this.saveDialog.getSelectedFile()
        if (selectedFile) {
          this.mainFrame.currentMetamodelFilename = selectedFile.getAbsolutePath()
          this.mainFrame.controller.saveMetaMapping(this.mainFrame.currentMetamodelFilename)
        }
      } catch (e1) {
        console.error(e1)
        JOptionPane.showMessageDialog(this.mainFrame, (e1 as Error).message)
      }
    }
  }
}

class PreferencesAction extends AbstractAction {
  protected newDatasourceDialog: PreferencesDialog

  constructor(protected mainFrame: MainFrame) {
    super("Preferences")
    this.newDatasourceDialog = new PreferencesDialog(this.mainFrame, this.mainFrame.controller)
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Setup application preferences")
  }

  actionPerformed(_e: ActionEvent): void {
    this.newDatasourceDialog.pack()
    this.newDatasourceDialog.setVisible(true)
  }
}

class ExitAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("File.exit"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Exit the application")
  }

  actionPerformed(_e: ActionEvent): void {
    if (this.exitConfirmation()) {
      this.mainFrame.controller.close()
      this.mainFrame.dispose()
      process.exit(0)
    }
  }

  private exitConfirmation(): boolean {
    return !this.mainFrame.checkExitConfirmation || JOptionPane.showConfirmDialog(this.mainFrame, "Are you" +
      " sure ?") == JDialogResult.APPROVE_OPTION
  }
}

class AddClassAction extends AbstractAction {
  public constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("MetaType.add"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Add a new type to the metamodel")
  }

  actionPerformed(_e: ActionEvent): void {
    const newMetaType = this.mainFrame.controller.getMetaModel().createType()
    const typePane = new TypePane(this.mainFrame.controller, newMetaType)
    const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, typePane, this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, newMetaType)
    if (choosenOption == JDialogResult.OK_OPTION) {
      typePane.ok()
      this.mainFrame.controller.getMetaModel().addMetaType(newMetaType)
      const metaTypeNode = new DefaultMutableTreeNode(newMetaType)
      const root = this.mainFrame.metaModelTreeModel.getRoot() as MutableTreeNode
      this.mainFrame.metaModelTreeModel.insertNodeInto(metaTypeNode, root, root.getChildCount())
      const pathes = metaTypeNode.getPath()
      const path = new TreePath(pathes)
      this.mainFrame.modelTree.makeVisible(path)
//            modelTree.setSelectionPath(path);
      this.mainFrame.setModified()
    }
  }
}

class AddFunctionAction extends AbstractAction {
  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("MetaFunction.add"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Add a new function to the metamodel")
  }

  actionPerformed(_e: ActionEvent): void {
    const metaFunction = this.mainFrame.controller.getMetaModel().createFunction()
    const typePane = new FunctionPane(this.mainFrame.controller, metaFunction)
    const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, typePane, this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, metaFunction)
    if (choosenOption == JDialogResult.OK_OPTION) {
      typePane.ok()
      this.mainFrame.controller.getMetaModel().addFunction(metaFunction)
      const metaTypeNode = new DefaultMutableTreeNode(metaFunction)
      const root = this.mainFrame.metaModelTreeModel.getRoot() as MutableTreeNode
      this.mainFrame.metaModelTreeModel.insertNodeInto(metaTypeNode, root, root.getChildCount())
      const pathes = metaTypeNode.getPath()
      const path = new TreePath(pathes)
      this.mainFrame.modelTree.makeVisible(path)
//            modelTree.setSelectionPath(path);
      this.mainFrame.setModified()
    }
  }
}

class AddFieldAction extends AbstractAction {

  constructor(protected mainFrame: MainFrame) {
    super(MainFrame.resourceBundle.getString("MetaField.add"))
    this.mainFrame.putValue(JFrame.SHORT_DESCRIPTION, "Add a new field to this class")
  }

  actionPerformed(_e: ActionEvent): void {
    const lastSelectedComponent = this.mainFrame.modelTree.getLastSelectedPathComponent()
    if (lastSelectedComponent instanceof DefaultMutableTreeNode) {
      const metaTypeNode = lastSelectedComponent as DefaultMutableTreeNode
      const metaType = metaTypeNode.getUserObject() as MetaType
      const metaField = metaType.createField() as MetaField

      const fieldPane = new FieldPane(this.mainFrame.controller, metaField)
      const choosenOption = JOptionPane.showOptionDialog(this.mainFrame, fieldPane, this.mainFrame.getValue(JFrame.SHORT_DESCRIPTION), JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, null, metaField)
      if (choosenOption == JDialogResult.OK_OPTION) {
        fieldPane.ok()
        metaType.addField(metaField)
        const fieldNode = new DefaultMutableTreeNode(metaField)
        this.mainFrame.metaModelTreeModel.insertNodeInto(fieldNode, metaTypeNode, metaTypeNode.getChildCount())
        const pathes = fieldNode.getPath()
        const path = new TreePath(pathes)
        this.mainFrame.modelTree.makeVisible(path)
        this.mainFrame.setModified()
      }
    } else {
      JOptionPane.showMessageDialog(this.mainFrame, MainFrame.resourceBundle.getString("SelectATypeNodeFirst"))
    }
  }
}

/**
 *
 */
export class MainFrame extends JFrame {
  static resourceBundle: ResourceBundle
  checkExitConfirmation = false
  saveAsAction: SaveMetamodelAsAction
  public currentMetamodelFilename: string
  metaModelTreeModel: DefaultTreeModel
  readonly modelTree: JTree
  databaseMenuIndex: number
  private exitAction: Action
  private addDatasourceAction: AddDatasourceAction
  private preferencesAction: PreferencesAction
  private aboutAction: AboutAction
  private saveAction: SaveMetamodelAction
  private metamodelMenuIndex: number
  private splitPane: JSplitPane
  private addClassAction: AddClassAction
  private addFieldAction: AddFieldAction
  private addFunctionAction: AddFunctionAction
  private openMetaModelAction: OpenMetamodelAction
  private rootNode: DefaultMutableTreeNode
  private fileMenuIndex: number

  constructor(readonly controller: UFOPlatformController) {
    super(MainFrame.getBundle().getString("MainFrame.title"))
    this.controller = controller

    this.rootNode = new DefaultMutableTreeNode(MainFrame.resourceBundle.getString("MetaModel"))
    this.metaModelTreeModel = new DefaultTreeModel(this.rootNode)
    this.modelTree = new JTree(this.metaModelTreeModel)
    this.modelTree.setShowsRootHandles(true)
    this.modelTree.putClientProperty("JTree.lineStyle", "Angled")
    const treeFont = this.modelTree.getFont()
    const typeFont = treeFont.deriveFont(Font.BOLD)
    const fieldFont = treeFont.deriveFont(Font.PLAIN)
    const functionFont = treeFont.deriveFont(Font.ITALIC)
    const self = this
    const renderer = new class extends DefaultTreeCellRenderer {
      getTreeCellRendererComponent(tree: JTree, value: any, sel: boolean, expanded: boolean, leaf: boolean, row: number, hasFocus: boolean): JComponent {
        const comp = this.getTreeCellRendererComponent(tree, value, sel, expanded, leaf, row, hasFocus)
        const userObject = (value as DefaultMutableTreeNode).getUserObject()
        if (userObject instanceof MetaTypeImpl) {
          comp.setFont(typeFont)
        } else if (userObject instanceof MetaFieldImpl) {
          comp.setFont(fieldFont)
        } else if (userObject instanceof MetaFunctionImpl) {
          comp.setFont(functionFont)
        }
        return comp
      }
    }()
    renderer.setLeafIcon(null)
    renderer.setClosedIcon(null)
    renderer.setOpenIcon(null)
    this.modelTree.setCellRenderer(renderer)

    this.exitAction = new ExitAction(this)
    this.setupMenuBar()

    const popup = new JPopupMenu()
    popup.add(new JMenuItem(self.addClassAction))
    popup.add(new JMenuItem(self.addFieldAction))
    popup.add(new JMenuItem(self.addFunctionAction))
    popup.add(new JSeparator())
    popup.add(new JMenuItem("Remove"))
    this.modelTree.addMouseListener(new class extends MouseAdapter {
      mousePressed(e: JMouseEvent): void {
        if (e.isPopupTrigger()) {
          this.handlePopup(e)
        }
      }

      mouseReleased(e: JMouseEvent): void {
        if (e.isPopupTrigger()) {
          this.handlePopup(e)
        } else if (e.getClickCount() == 2) {
          const node = this.getSelectedNode(e)
          if (node != null) {
            const o = node.getUserObject()
            if (o instanceof MetaTypeImpl) {
              const type = o as MetaType
              const pane = new TypePane(controller, type)
              self.contents.removeAll()
              self.contents.setBackground(pane.getBackground())
              self.contents.add(pane, BorderLayout.NORTH)
              const mappingPanel = this.getMappingTabbedPane(controller)
              self.contents.add(mappingPanel, BorderLayout.CENTER)
              self.contents.validate()
              pane.requestFocusInWindow()
            } else if (o instanceof MetaFieldImpl) {
              const field = o as MetaField
              const pane = new FieldPane(controller, field)
              pane.addFocusListener(new class extends FocusAdapter {
                focusLost(e: FocusEvent): void {
                  pane.ok()
                  console.log("e = " + e)
                }
              }())
              self.contents.removeAll()
              self.contents.setBackground(pane.getBackground())
              self.contents.add(pane, BorderLayout.NORTH)
              const mappingPanel = this.getMappingTabbedPane(controller)
              self.contents.add(mappingPanel, BorderLayout.CENTER)
              self.contents.validate()
              pane.requestFocusInWindow()
            }
          }
        }
      }

      private getMappingTabbedPane(controller: UFOPlatformController): JComponent {
        let mappingPane
        const datasources = controller.getDatasources()
        if (datasources.size > 0) {
          const mappingPanel = new JTabbedPane()
          for (const datasource of datasources) {
            const databaseMappingPanel = new JPanel()
            mappingPanel.addTab(datasource.getName(), null, databaseMappingPanel, datasource.getName())

            const dataModel = datasource.getDataModel()
            const rootNode = new DefaultMutableTreeNode(MainFrame.resourceBundle.getString("DataModel"))
            const metaModelTreeModel = new DefaultTreeModel(rootNode)
            const modelTree = new JTree(metaModelTreeModel)
            self.modelTree.setShowsRootHandles(true)
            modelTree.putClientProperty("JTree.lineStyle", "Angled")
            self.loadMetaData(dataModel, metaModelTreeModel, modelTree)
            databaseMappingPanel.add(modelTree)
          }
          mappingPane = mappingPanel
        } else {
          mappingPane = new JPanel()
          mappingPane.add(new JButton(self.addDatasourceAction))
        }
        return mappingPane
      }

      private handlePopup(e: JMouseEvent): void {
        const node = this.getSelectedNode(e)
        if (node != null) {
          const o = node.getUserObject()
          self.addClassAction.setEnabled(node == self.rootNode)
          self.addFunctionAction.setEnabled(node == self.rootNode)
          self.addFieldAction.setEnabled(o instanceof MetaTypeImpl)
          popup.show(e.getComponent(), e.getX(), e.getY())
        }
      }

      private getSelectedNode(e: JMouseEvent): DefaultMutableTreeNode | null {
        let node
        const path = self.modelTree.getPathForLocation(e.getX(), e.getY())
        if (path != null) {
          node = path.getLastPathComponent() as DefaultMutableTreeNode
        } else {
          node = null
        }
        return node
      }
    }())

    this.contents = new JPanel(new BorderLayout())
    this.contents.setBackground(Color.GRAY)
    this.contents.setPreferredSize(new Dimension(800, 600))
    const splitPane = new JSplitPane(JSplitPaneDirection.HORIZONTAL_SPLIT, self.modelTree, self.contents)

    this.getContentPane().add(splitPane)

    this.loadMetaData(controller.getMetaModel(), this.metaModelTreeModel, this.modelTree)
  }

  static getBundle(): ResourceBundle {
    if (MainFrame.resourceBundle == null) {
      MainFrame.resourceBundle = ResourceBundle.getBundle("org.ufomatics.archipelago.view.Archipelago")
    }
    return MainFrame.resourceBundle
  }

  loadMetaData(model: MetaModel, treeModel: DefaultTreeModel, tree: JTree): void {
    this.clearTree(treeModel, tree)
    this.loadTree(model, treeModel)
  }

  setVisible(b: boolean): void {
    super.setVisible(b)
    const screenBounds = this.getGraphicsConfiguration().getBounds()
    this.setLocation((screenBounds.getCenterX() - this.getSize().getWidth() / 2), (screenBounds.getCenterY() - this.getSize().getHeight() / 2))
  }

  isCheckExitConfirmation(): boolean {
    return this.checkExitConfirmation
  }

  setCheckExitConfirmation(checkExitConfirmation: boolean): void {
    this.checkExitConfirmation = checkExitConfirmation
  }

  setModified(): void {
    this.saveAction.setEnabled(true)
    this.saveAsAction.setEnabled(true)
  }

  databaseMenu(): JMenu {
    const dataMenu = new JMenu(MainFrame.resourceBundle.getString("Datasources"))
    const datasources = this.controller.getDatasources()
    for (const datasource of datasources) {
      const datasourceMenu = new JMenu(datasource.getName())
      const editMappingItem = new JMenuItem("Edit mapping...")
      editMappingItem.setEnabled(this.controller.hasMetaModel())
      datasourceMenu.add(editMappingItem)
      dataMenu.add(datasourceMenu)
    }
    dataMenu.add(new JSeparator())
    this.addDatasourceAction = new AddDatasourceAction(this)
    dataMenu.add(new JMenuItem(this.addDatasourceAction))
    return dataMenu
  }

  protected processWindowEvent(e: JWindowEvent): void {
    if (e.getID() == JWindowEvent.WINDOW_CLOSING) {
      this.exitAction.actionPerformed(new ActionEvent(this, 0, null))
    }
  }

  private loadTree(model: MetaModel, treeModel: DefaultTreeModel): void {
    const metaTypes = model.getClasses()
    for (const metaType of metaTypes._set) {
      const metaTypeNode = new DefaultMutableTreeNode(metaType)
      (treeModel.getRoot() as DefaultMutableTreeNode).add(metaTypeNode)
      for (const metaField of metaType.getFields()) {
        const metaFieldNode = new DefaultMutableTreeNode(metaField)
        metaTypeNode.add(metaFieldNode)
      }
    }
    const functions = model.getFunctions()
    for (const metaFunction of functions._set) {
      const functionNode = new DefaultMutableTreeNode(metaFunction);
      (treeModel.getRoot() as DefaultMutableTreeNode).add(functionNode)
      for (const parameter of metaFunction.getParameters()) {
        const parameterNode = new DefaultMutableTreeNode(parameter)
        functionNode.add(parameterNode)
      }
    }
    treeModel.reload()
  }

  private clearTree(treeModel: DefaultTreeModel, tree: JTree) {
    const root = treeModel.getRoot() as MutableTreeNode
    const max = root.getChildCount()
    for (let i = 0; i < max; i++) {
      root.remove(0)
    }
    tree.removeAll()
  }

  private setupMenuBar(): void {
    const menuBar = new JMenuBar()

    this.fileMenuIndex = menuBar.getMenuCount()
    menuBar.add(this.fileMenu())

    this.metamodelMenuIndex = menuBar.getMenuCount()
    menuBar.add(this.metamodelMenu())

    this.databaseMenuIndex = menuBar.getMenuCount()
    menuBar.add(this.databaseMenu())

    menuBar.add(this.helpMenu())
    this.setJMenuBar(menuBar)
  }

  private metamodelMenu(): JMenu {
    const menu = new JMenu(MainFrame.getBundle().getString("MetaModel"))

    this.addClassAction = new AddClassAction(this)
    menu.add(new JMenuItem(this.addClassAction))

    this.addFieldAction = new AddFieldAction(this)
    menu.add(new JMenuItem(this.addFieldAction))

    this.addFunctionAction = new AddFunctionAction(this)
    menu.add(new JMenuItem(this.addFunctionAction))

    return menu
  }

  private helpMenu(): JMenu {
    const menu = new JMenu(MainFrame.resourceBundle.getString("Help"))
    menu.add(new JMenuItem("Search"))
    menu.add(new JMenuItem("Contents"))
    menu.add(new JSeparator())
    this.aboutAction = new AboutAction(this)
    menu.add(new JMenuItem(this.aboutAction))
    return menu
  }

  private fileMenu(): JMenu {
    const menu = new JMenu(MainFrame.resourceBundle.getString("File"))
    this.openMetaModelAction = new OpenMetamodelAction(this)
    menu.add(new JMenuItem(this.openMetaModelAction))

    this.saveAction = new SaveMetamodelAction(this)
    menu.add(new JMenuItem(this.saveAction))

    this.saveAsAction = new SaveMetamodelAsAction(this)
    menu.add(new JMenuItem(this.saveAsAction))

    const recentFilesSubMenu = new JMenu(MainFrame.resourceBundle.getString("RecentFiles"))
    const recentFiles = this.controller.getRecentFiles()
    if (!recentFiles.isEmpty()) {
      for (const recentFile of recentFiles._set) {
        const editMappingItem = new JMenuItem(recentFile as string)
        recentFilesSubMenu.add(editMappingItem)
//                recentFilesSubMenu.setEnabled(true);
      }
    } else {
//            recentFilesSubMenu.setEnabled(false);
    }
    menu.add(recentFilesSubMenu)

    menu.add(new JSeparator())

    const preferencesAction = new PreferencesAction(this)
    menu.add(new JMenuItem(preferencesAction))
    menu.add(new JSeparator())
    menu.add(new JMenuItem(this.exitAction))
    return menu
  }
}
