import {DatabaseAdapter} from "archipelago/api/model/DatabaseAdapter"
import {Localizer} from "archipelago/api/util/Localizer"
import {MetaMapping} from "archipelago/api/model/MetaMapping"
import {MetaMappingImpl} from "archipelago/impl/src/ufomatics/archipelago/model/MetaMappingImpl"
import {MetaType, TEXT} from "archipelago/api/model/MetaType"
import {Properties} from "archipelago/api/util/jsdk/util/Properties"
import {Database} from "archipelago/api/model/Database"
import {DatabaseImpl} from "archipelago/impl/src/ufomatics/archipelago/model/DatabaseImpl"
import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {MetaException} from "archipelago/api/model/MetaException"
import {MetaModel} from "archipelago/api/model/MetaModel"
import {HashSet} from "archipelago/api/util/jsdk/util/HashSet"
import {StringTokenizer} from "archipelago/api/util/jsdk/util/StringTokenizer"

/**
 *
 */
export class UFOPlatformControllerImpl implements UFOPlatformController {
  private adapters = new HashSet<DatabaseAdapter>()
  private metaMapping: MetaMapping = new MetaMappingImpl()
  private preferences = Preferences.userNodeForPackage(getClass())

  constructor(protected localizer: Localizer) {
    this.initAdapters()
    this.initMetaMapping()
  }

  static find(tosubclass: Class): Set<Class> {
    const classes = new Set<Class>()
    const pcks = Package.getPackages()
    for (let pck of pcks) {
      classes.addAll(find(pck.getName(), tosubclass))
    }
    return classes
  }

  static find(pckgname: string, toSubClass: Class): Set<Class> {
    const classes = new Set<Class>()
    const name = String(pckgname)
    if (!name.startsWith("/")) {
      name = "/" + name
    }
    name = name.replace(".", "/")

    // Get a File object for the package
    const url = Launcher.class.getResource(name)
    if (url != null) {
      const directory = new File(url.getFile())
      if (directory.exists()) {
        // Get the list of the files contained in the package
        const files = directory.list()
        for (let file of files) {
          // we are only interested in .class files
          if (file.endsWith(".class")) {
            // removes the .class extension
            const classname = file.substring(0, file.length() - 6)
            try {
              // Try to create an instance of the object
              const aClass = Class.forName(pckgname + "." + classname)
              if (((aClass.getModifiers() & Modifier.ABSTRACT) == 0) && toSubClass.isAssignableFrom(aClass)) {
                classes.add(aClass)
              }
            } catch (cnfex) {
              console.error(cnfex)
            }
          }
        }
      }
    }
    return classes
  }

  getMetaModel(): MetaModel {
    return this.metaMapping.getMetaModel()
  }

  hasMetaModel(): boolean {
    return this.metaMapping.getMetaModel() != null && !this.metaMapping.getMetaModel().isEmpty()
  }

  loadMetaMapping(name: string): void {
    console.log("Loading " + name)
    try {
      const fileInputStream = new FileInputStream(name)
      const inputStream = new BufferedInputStream(fileInputStream)
      const xmlDecoder = new XMLDecoder(inputStream)
      try {
        const o = xmlDecoder.readObject()
        if (o == null) {
          throw new MetaException("Could not resolve content of file " + name)
        }
        if (o instanceof MetaModel) {
          this.metaMapping.setMetaModel(o as MetaModel)
        } else {
          this.metaMapping = o as MetaMapping
        }
        const recentFiles = this.getRecentFiles()
        recentFiles.add(name)
        try {
          this.preferences.flush()
        } catch (e) {
          e.printStackTrace()
        }
      } finally {
        xmlDecoder.close()
      }
    } catch (e) {
      console.error(e)
      throw new MetaException("Could not find file " + name, e)
    }
  }

  getRecentFiles(): HashSet<String> {
    const recentFiles = new HashSet<String>()
    const recentFilesStr = this.preferences.get("recentFiles", "")
    const st = new StringTokenizer(recentFilesStr, ";")
    while (st.hasMoreTokens()) {
      const s = st.nextToken()
      recentFiles.add(s)
    }
    return recentFiles
  }

  saveMetaMapping(filename: string): void {
    const outputStream = new BufferedOutputStream(new FileOutputStream(filename))
    const xmlEncoder = new XMLEncoder(outputStream)
    try {
      xmlEncoder.writeObject(this.metaMapping)
    } finally {
      xmlEncoder.close()
    }
  }

  getDefaultFieldType(): MetaType {
    return TEXT
  }

  getDefaultAdapter(): DatabaseAdapter {
    return this.adapters.isEmpty() ? null : this.adapters.values().next()
  }

  getLocalizer(): Localizer {
    return this.localizer
  }

  getAdapters(): HashSet<DatabaseAdapter> {
    return this.adapters
  }

  close(): void {
    for (let adapter of this.adapters._set) {
      adapter.close()
    }
  }

  getDatasources(): Set<Database> {
    return this.metaMapping.getDatasources()
  }

  addDatasource(database: Database): void {
    this.metaMapping.getDatasources().add(database)
  }

  createDatasource(): Database {
    return new DatabaseImpl()
  }

  private initMetaMapping(): void {
    this.metaMapping = new MetaMappingImpl()
  }

  private initAdapters(): void {
    const adapterClasses = UFOPlatformControllerImpl.find(DatabaseAdapter.class)
    const properties = new Properties()
    for (let adapterClass of adapterClasses) {
      try {
        const adapter = adapterClass.newInstance() as DatabaseAdapter
        adapter.setProperties(properties)
        this.adapters.add(adapter)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
