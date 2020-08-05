import * as express from "express"
import { listen, router } from "fp-ts-express"
import { pipe } from "fp-ts/lib/function"
import { fold as foldTaskEither } from "fp-ts/lib/TaskEither"
import { HelloRequestV2 } from "./model"
import { get } from "./components/flow"
import { hello } from "./hello"

const app = express()

const getHello = get("/hello", HelloRequestV2, hello)
const v1 = router("/v1", getHello)
const v2 = router("/v2", getHello)
const api = router("/api", v1, v2)
api(app)

pipe(
  app,
  listen(8080),
  foldTaskEither(
    (err) => async () => console.error(err),
    (server) => async () => console.log("server is listening", server.address())
  )
)()
