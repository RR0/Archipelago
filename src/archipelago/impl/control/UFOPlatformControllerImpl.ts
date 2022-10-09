import {DatabaseAdapter} from "archipelago/api/model/DatabaseAdapter"
import {Localizer} from "archipelago/api/util/Localizer"
import {MetaMapping} from "archipelago/api/model/MetaMapping"
import {MetaMappingImpl} from "archipelago/impl/model/MetaMappingImpl"
import {MetaType, TEXT} from "archipelago/api/model/MetaType"
import {Database} from "archipelago/api/model/Database"
import {DatabaseImpl} from "archipelago/impl/model/DatabaseImpl"
import {UFOPlatformController} from "archipelago/api/control/UFOPlatformController"
import {MetaException} from "archipelago/api/model/MetaException"
import {MetaModel} from "archipelago/api/model/MetaModel"
import {MetaModelImpl} from "archipelago/api/model/MetaModelImpl"
import {HashSet, JSet, Preferences, Properties, StringTokenizer} from "ts-jsdk"

/**
 *
 */
export class UFOPlatformControllerImpl implements UFOPlatformController {

  private metaMapping: MetaMapping = new MetaMappingImpl()
  private preferences = Preferences.userNodeForPackage(this)

  constructor(protected localizer: Localizer, protected adapters: JSet<DatabaseAdapter>) {
    this.initAdapters(adapters)
    this.initMetaMapping()
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
        if (o instanceof MetaModelImpl) {
          this.metaMapping.setMetaModel(o as MetaModel)
        } else {
          this.metaMapping = o as MetaMapping
        }
        const recentFiles = this.getRecentFiles()
        recentFiles.add(name)
        try {
          this.preferences.flush()
        } catch (e) {
          console.error(e)
        }
      } finally {
        xmlDecoder.close()
      }
    } catch (e) {
      console.error(e)
      throw new MetaException("Could not find file " + name, e as Error)
    }
  }

  getRecentFiles(): JSet<String> {
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

  getAdapters(): JSet<DatabaseAdapter> {
    return this.adapters
  }

  close(): void {
    for (let adapter of this.adapters) {
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

  private initAdapters(adapters: JSet<DatabaseAdapter>): void {
    const properties = new Properties()
    for (const adapter of adapters) {
      try {
        adapter.setProperties(properties)
        this.adapters.add(adapter)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
