import { Application } from "express"
import * as TaskEither from "fp-ts/lib/TaskEither"
import { defer } from "tsla-util/lib/promise/defer"

export const listen = (port: number) => (app: Application) => {
  return TaskEither.tryCatch(
    async () => {
      const { promise, resolve } = defer<void>()

      const server = app.listen(port, resolve)

      await promise

      return server
    },
    (err) => err as Error
  )
}
