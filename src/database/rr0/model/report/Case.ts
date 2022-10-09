import {Account} from "database/rr0/model/report/Account"

export class Case {

  constructor(readonly title: string, readonly accounts: Account[] = []) {
  }
}
