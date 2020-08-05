import { RequestContext } from "fp-ts-express"
import { isLeft } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { Type } from "io-ts"
import { PathReporter } from "io-ts/lib/PathReporter"

export const decode = <T, R>(
  type: Type<T> | Type<T>["decode"],
  u: unknown,
  child: (value: T) => (requestContext: RequestContext) => R
) => (requestContext: RequestContext) => {
  let decodeFn = typeof type === "function" ? type : type.decode

  const either = decodeFn(u)

  if (isLeft(either)) {
    return pipe(either, PathReporter.report, (errors) => ({
      status: 400,
      value: { errors },
    }))
  }

  return child(either.right)(requestContext)
}
