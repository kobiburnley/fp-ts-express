import { RequestHandler } from "express"
import { RequestContext } from "./requestContext"

export const bridge = (
  child: (requestContext: RequestContext) => unknown
): RequestHandler => (req, res, next) => {
  child({
    req,
    res,
    next,
  })
}
