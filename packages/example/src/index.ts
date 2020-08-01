import * as express from "express"
import { listen, router } from "fp-ts-express"
import { pipe } from "fp-ts/lib/function"
import { fold as foldTaskEither } from "fp-ts/lib/TaskEither"
import { commonGet } from "./commonRequestFlow"
import { hello } from './hello'
import { HelloRequestV2 } from "./model"

const app = express()

pipe(
  app,
  router(
    "/api",
    router(
      "/v2",
      commonGet("/hello", HelloRequestV2, hello)
    )
  )
)

pipe(
  app,
  listen(8080),
  foldTaskEither(
    (err) => async () => console.error(err),
    (server) => async () => console.log("server is listening", server.address())
  )
)()
