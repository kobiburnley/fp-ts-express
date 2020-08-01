import { Request, Response } from "express"
import { get, statusJSON, json, HttpResult, taskJSON } from "fp-ts-express"
import { alt, isLeft } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { TaskEither, tryCatch } from "fp-ts/lib/TaskEither"
import { Type } from "io-ts"
import { badRequestIO, decodeHeadersBase, decodeQuery, decodeQueryBase } from "io-ts-express"
import { auth } from "./auth"
import { decodeBearerToken, User, decodeAccessToken } from "./model"

export const commonRequestFlow = <T, E, A>(
  requestType: Type<T>,
  task: (user: User, request: T) => TaskEither<HttpResult<E>, A>
) => async (req: Request, res: Response) => {
  const bearerEither = pipe(
    req,
    decodeHeadersBase(decodeBearerToken),
    alt(() => pipe(req, decodeQueryBase(decodeAccessToken)))
  )

  if (isLeft(bearerEither)) {
    statusJSON(res)({ status: 401, value: { message: "Unauthorized" } })
    return
  }

  const userEither = await auth(bearerEither.right)()
  if (isLeft(userEither)) {
    statusJSON(res)({ status: 401, value: { message: "Unauthorized" } })
    return
  }

  const { right: user } = userEither

  const requestEither = pipe(req, decodeQuery(requestType))

  if (isLeft(requestEither)) {
    badRequestIO(res)(requestEither.left)
    return
  }


  pipe(task(user, requestEither.right), taskJSON(res))
}

export const commonGet = <T, E, A>(
  path: string,
  requestType: Type<T>,
  task: (user: User, request: T) => TaskEither<HttpResult<E>, A>
) => {
  return get(
    path,
    commonRequestFlow(requestType, task)
  )
}
