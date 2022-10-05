/**
 *
 */
export class MetaException extends Error {

  constructor(message?: string | Error, readonly cause?: Error) {
    super(message instanceof Error ? message.message : message)
  }
}
