import {
    bridge,
    HttpResult,
    json,
    RequestContext,
    tryCatch
} from "fp-ts-express"

export const result = (
  child: (c: RequestContext) => HttpResult | Promise<HttpResult>
) => bridge(tryCatch(json(child)))

