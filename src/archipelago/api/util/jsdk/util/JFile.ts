export class JFile {

  constructor(private pathname: string) {
  }

  getAbsolutePath(): string {
    return process.cwd() + this.pathname
  }

  exists(): boolean {
    return true
  }

  list(): string[] {

  }
}
