export class Font {
  static readonly DEFAULT = new Font()
  static readonly BOLD = "BOLD"
  static readonly PLAIN = "PLAIN"
  static readonly ITALIC = "ITALIC"

  deriveFont(_variant: string): Font {
    return this
  }
}
