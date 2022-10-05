import {MetaObject} from "archipelago/api/model/MetaObject"

/**
 *
 */
export interface MetaObjectVisitor {

  visit(sighting: MetaObject): MetaObject
}
