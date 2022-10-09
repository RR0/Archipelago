import {Identity} from "../../api/model/Identity"
import {IllegalArgumentException, MessageFormat} from "ts-jsdk"

/**
 *
 */
export class IdentityImpl implements Identity {

  private static readonly emailFormat = new MessageFormat("{0}@{1}.{2}")

  constructor(protected readonly name: string, readonly emails: string[] = [], readonly homePages: URL[] = []) {
  }

  addEmail(email: string) {
    try {
      IdentityImpl.emailFormat.parse(email)
      this.emails.push(email)
    } catch (e) {
      throw new IllegalArgumentException("\"" + email + "\" is not a valid email: " + e)
    }
  }

  isPseudonym(): boolean {
    return false
  }

  getName(): string {
    return this.name
  }

  addHomePage(homePage: URL) {
    this.homePages.push(homePage)
  }
}
