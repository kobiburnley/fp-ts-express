import { Response } from "express"
import { statusJSON } from "fp-ts-express/lib/json"
import { left } from "fp-ts/lib/Either"
import { Errors } from "io-ts"
import { PathReporter } from "io-ts/lib/PathReporter"

export const badRequestIO = (res: Response) => (errors: Errors) =>
  statusJSON(res)({
    status: 400,
    value: PathReporter.report(left(errors)),
  })
