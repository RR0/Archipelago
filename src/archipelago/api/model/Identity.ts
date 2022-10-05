import {Principal} from "archipelago/api/util/jsdk/Principal"

/**
 * An Actor may have multiple identities (pseudonyms).
 */
export interface Identity extends Principal {
  /**
   * Get available electronic mail addresses to communicate with this identity.
   *
   * @return An array of String containing the email addresses.
   */
  emails: string[]

  /**
   * The actor's Web pages addresses (HTTP URLs)
   */
  homePages: URL[]

  /**
   * Return if this identity is a pseudonym or not.
   *
   * @return true if this identity is a pseudonym, false if it is the "true" identity of an Actor.
   */
  isPseudonym(): boolean

  addEmail(email: string): void

  addHomePage(homePage: URL): void
}
