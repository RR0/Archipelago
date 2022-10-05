import {JFile} from "archipelago/api/util/jsdk/util/JFile"

export class FileFilter {

  accept(_f: JFile): boolean {
    return true
  }

  getDescription(): string {
    return ""
  }
}
