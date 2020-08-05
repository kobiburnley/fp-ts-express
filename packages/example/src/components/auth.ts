import { RequestContext } from "fp-ts-express"
import * as t from "io-ts"
import { decodeQuery } from "io-ts-express"
import { User } from "../model"

export const Credentials = t.type({
  accessToken: t.string,
})

export type Credentials = t.TypeOf<typeof Credentials>

export const auth = <R>(
  child: (user: User) => (requestContext: RequestContext) => R
) =>
  decodeQuery<Credentials, R>(Credentials, ({ accessToken }) =>
    child({ email: accessToken })
  )
