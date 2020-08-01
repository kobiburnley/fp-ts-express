import { Request } from "express"
import { Type, Validation } from "io-ts"

export const decodeHeadersBase = <T>(validation: (u: unknown) => Validation<T>) => (
  req: Request
) => {
  return validation(req.headers)
}

export const decodeHeaders = <T>(type: Type<T>) => decodeHeadersBase(type.decode)
