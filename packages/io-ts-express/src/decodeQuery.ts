import { Request } from "express"
import { Type, Validation } from "io-ts"

export const decodeQueryBase = <T>(validation: (u: unknown) => Validation<T>) => (
  req: Request
) => {
  return validation(req.query)
}

export const decodeQuery = <T>(type: Type<T>) => decodeQueryBase(type.decode)
