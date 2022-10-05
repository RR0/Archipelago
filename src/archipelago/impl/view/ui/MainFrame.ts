import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {ResourceBundle} from "archipelago/api/util/jsdk/util/ResourceBundle"
import {MetaType} from "archipelago/api/model/MetaType"
import {ActionEvent} from "archipelago/api/util/jsdk/awt/ActionEvent"
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
import {JTree} from "archipelago/api/util/jsdk/swing/JTree"
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
import {Color} from "archipelago/api/util/jsdk/swing/Color"
import {Dimension} from "archipelago/api/util/jsdk/swing/Dimension"
import {JWindowEvent} from "archipelago/api/util/jsdk/swing/JWindow"
import {SaveMetamodelAction} from "archipelago/impl/view/ui/SaveMetamodelAction"
import {AddFieldAction} from "archipelago/impl/view/ui/AddFieldAction"
import {AddFunctionAction} from "archipelago/impl/view/ui/AddFunctionAction"
import {AddClassAction} from "archipelago/impl/view/ui/AddClassAction"
import {ExitAction} from "archipelago/impl/view/ui/ExitAction"
import {PreferencesAction} from "archipelago/impl/view/ui/PreferencesAction"
import {SaveMetamodelAsAction} from "archipelago/impl/view/ui/SaveMetamodelAsAction"
import {OpenMetamodelAction} from "archipelago/impl/view/ui/OpenMetamodelAction"
import {AddDatasourceAction} from "archipelago/impl/view/ui/AddDatasourceAction"
import {AboutAction} from "archipelago/impl/view/ui/AboutAction"

/**
 *
 */
export class MainFrame extends JFrame {
  static resourceBundle: ResourceBundle
  checkExitConfirmation = false
  saveAsAction: SaveMetamodelAsAction
  public currentMetamodelFilename: string | undefined = undefined
  metaModelTreeModel: DefaultTreeModel
  readonly modelTree: JTree
  databaseMenuIndex: number
  private readonly exitAction: Action
  private addDatasourceAction: AddDatasourceAction
  private saveAction: SaveMetamodelAction
  private readonly splitPane: JSplitPane
  private addClassAction: AddClassAction
  private addFieldAction: AddFieldAction
  private addFunctionAction: AddFunctionAction
  private readonly rootNode: DefaultMutableTreeNode

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
    const aboutAction = new AboutAction(this)
    const saveAsAction = this.saveAsAction = new SaveMetamodelAsAction(this)
    this.databaseMenuIndex = this.setupMenuBar(aboutAction, saveAsAction)

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
    this.splitPane = new JSplitPane(JSplitPaneDirection.HORIZONTAL_SPLIT, self.modelTree, self.contents)

    this.getContentPane().add(this.splitPane)

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

  private setupMenuBar(aboutAction: AboutAction, saveMetataModelAsAction: SaveMetamodelAsAction): number {
    const menuBar = new JMenuBar()
    menuBar.add(this.fileMenu(saveMetataModelAsAction))
    menuBar.add(this.metamodelMenu())

    const databaseMenuIndex = menuBar.getMenuCount()
    menuBar.add(this.databaseMenu())

    menuBar.add(this.helpMenu(aboutAction))
    this.setJMenuBar(menuBar)

    return databaseMenuIndex
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

  private helpMenu(aboutAction: AboutAction): JMenu {
    const menu = new JMenu(MainFrame.resourceBundle.getString("Help"))
    menu.add(new JMenuItem("Search"))
    menu.add(new JMenuItem("Contents"))
    menu.add(new JSeparator())
    menu.add(new JMenuItem(aboutAction))
    return menu
  }

  private fileMenu(saveAsAction: SaveMetamodelAsAction): JMenu {
    const menu = new JMenu(MainFrame.resourceBundle.getString("File"))
    const openMetaModelAction = new OpenMetamodelAction(this)
    menu.add(new JMenuItem(openMetaModelAction))

    this.saveAction = new SaveMetamodelAction(this)
    menu.add(new JMenuItem(this.saveAction))

    menu.add(new JMenuItem(saveAsAction))

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
