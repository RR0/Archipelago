import {MetaDataSource} from "archipelago/api/model/MetaDataSource"
import {Identity} from "archipelago/api/model/Identity"

/**
 *
 */
export interface User extends MetaDataSource {

  readonly login: string
  readonly identity: Identity

  isPasswordValid(somePassword: string): boolean
}
