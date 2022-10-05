export abstract class Calendar {

  protected constructor(private time: Date) {
  }

  setTime(time: Date) {
    this.time = time
  }

  getTime(): Date {
    return this.time
  }

  get(index: number): number | undefined {
    switch (index) {
      case 1:
        return this.time.getFullYear()
    }
    return undefined
  }
}
