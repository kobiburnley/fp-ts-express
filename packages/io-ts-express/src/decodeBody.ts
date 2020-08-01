import { Request } from "express"
import { Type, Validation } from "io-ts"

export const decodeBodyBase = <T>(validation: (u: unknown) => Validation<T>) => (
  req: Request
) => {
  return validation(req.body)
}

export const decodeBody = <T>(type: Type<T>) => decodeBodyBase(type.decode)
