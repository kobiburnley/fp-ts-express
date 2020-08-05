import { HttpResult } from "./httpResult"
import { RequestContext } from "./requestContext"

export const json = (
  child: (requestContext: RequestContext) => HttpResult | Promise<HttpResult>
) => async (requestContext: RequestContext) => {
  const { res } = requestContext

  const { status, value } = await child(requestContext)

  res.status(status).json(value)
}
