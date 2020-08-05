import { RequestContext } from "./requestContext"

export const tryCatch = (
  child: (requestContext: RequestContext) => unknown
) => async (requestContext: RequestContext) => {
  const { res } = requestContext

  try {
    await child(requestContext)
  } catch (e) {
    res.status(500).json({message: "Internal Server Error"})
  }
}
