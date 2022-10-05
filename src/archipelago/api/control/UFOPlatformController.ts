import {Database} from "archipelago/api/model/Database"
import {MetaModel} from "archipelago/api/model/MetaModel"
import {DatabaseAdapter} from "archipelago/api/model/DatabaseAdapter"
import {Localizer} from "archipelago/api/util/Localizer"
import {MetaType} from "archipelago/api/model/MetaType"
import {HashSet} from "archipelago/api/util/jsdk/util/HashSet"

/**
 *
 */
export interface UFOPlatformController {

  getLocalizer(): Localizer

  getAdapters(): HashSet<DatabaseAdapter>

  close(): void

  getDatasources(): Set<Database>

  getMetaModel(): MetaModel

  hasMetaModel(): boolean

  loadMetaMapping(filename: string): void;

  saveMetaMapping(filename: string): void;

  getDefaultFieldType(): MetaType

  getDefaultAdapter(): DatabaseAdapter

  addDatasource(database: Database): void

  createDatasource(): Database

  getRecentFiles(): HashSet<String>
}
