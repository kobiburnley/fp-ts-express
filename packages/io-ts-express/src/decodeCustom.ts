import { RequestContext } from "fp-ts-express"
import { Type } from "io-ts"
import { decode } from "./decode"
import { Request, request } from "express"

export const decodeCustom = <T, R>(
  type: Type<T> | Type<T>["decode"],
  raw: (req: Request) => unknown,
  child: (value: T) => (requestContext: RequestContext) => R
) => (requestContext: RequestContext) => {
  return decode<T, R>(type, raw(requestContext.req), child)(requestContext)
}
