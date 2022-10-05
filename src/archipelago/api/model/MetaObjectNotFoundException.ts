import {MetaException} from "archipelago/api/model/MetaException"
import {MetaObject} from "archipelago/api/model/MetaObject"
import {MetaDataSource} from "archipelago/api/model/MetaDataSource"

/**
 *
 */
export class MetaObjectNotFoundException extends MetaException {

  constructor(protected object: MetaObject, protected database: MetaDataSource) {
    super("Data for " + object + " could not be found in database " + database)
  }
}
