import { isLeft, left, right } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import * as t from "io-ts"

export const AuthHeaders = t.type({
  Authorization: t.string,
})
export type AuthHeaders = t.TypeOf<typeof AuthHeaders>

export const Bearer = t.tuple([t.string, t.string])

export const AccessToken = t.type({
  accessToken: t.string,
})

export const decodeBearerToken = (u: unknown) => {
  const headersEither = AuthHeaders.decode(u)

  if (isLeft(headersEither)) {
    return left<t.Errors, string>(headersEither.left)
  }

  const bearerEither = pipe(headersEither.right.Authorization.split(" "), Bearer.decode)

  if (isLeft(bearerEither)) {
    return left<t.Errors, string>(bearerEither.left)
  }

  return right<t.Errors, string>(bearerEither.right[1])
}

export const decodeAccessToken = (u: unknown) => {
  const accessTokenEither = AccessToken.decode(u)

  if (isLeft(accessTokenEither)) {
    return left<t.Errors, string>(accessTokenEither.left)
  }

  return right<t.Errors, string>(accessTokenEither.right.accessToken)
}

export const HelloRequest = t.type({
  a: t.string,
})
export type HelloRequest = t.TypeOf<typeof HelloRequest>

export const HelloRequestV2 = t.type({
  b: t.string,
})

export type HelloRequestV2 = t.TypeOf<typeof HelloRequestV2>

export interface User {
  email: string
}
