import { Response } from "express"
import { fold } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { TaskEither } from "fp-ts/lib/TaskEither"
import { HttpResult } from "./httpResult"

export const json = <A>(res: Response) => (a: A) => {
  res.json(a)
}

export const taskJSON = <E, A>(res: Response) => async (taskEither: TaskEither<HttpResult<E>, A>) =>
  pipe(
    await taskEither(),
    fold(({status, value}) => statusJSON(res)({ status, value }), json(res))
  )

export const statusJSON = <A>(res: Response) => ({ status, value }: HttpResult<A>) => {
  res.status(status).json(value)
}
