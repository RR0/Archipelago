export class Dimension {
  constructor(private _width: number, private _height: number) {
  }

  getWidth(): number {
    return this._width
  }

  setWidth(value: number) {
    this._width = value
  }

  getHeight(): number {
    return this._height
  }

  setHeight(value: number) {
    this._height = value
  }
}
