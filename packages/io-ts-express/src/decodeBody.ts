import { RequestContext } from "fp-ts-express"
import { Type } from "io-ts"
import { decode } from './decode'

export const decodeBody = <T, R>(
  type: Type<T> | Type<T>["decode"],
  child: (value: T) => (requestContext:  RequestContext) => R
) => (requestContext: RequestContext) => {
 return decode<T, R>(type, requestContext.req.body, child)(requestContext)
}
