import {User} from "archipelago/api/model/User"
import {Identity} from "archipelago/api/model/Identity"
import {Locale} from "ts-jsdk"

/**
 *
 */
export class UserImpl implements User {

  public constructor(readonly locale: Locale, readonly login: string, private password: string, readonly identity: Identity) {
  }

  isPasswordValid(somePassword: string): boolean {
    return this.password === somePassword
  }

  public getName(): string {
    return this.identity.getName()
  }
}
