import { Request } from "express"
import {
  get as getBase,
  HttpResult,
  post as postBase,
  RequestContext,
} from "fp-ts-express"
import { Type } from "io-ts"
import { decodeCustom } from "io-ts-express"
import { User } from "../model"
import { auth } from "./auth"
import { result } from "./result"

export interface FlowProps<T> {
  user: User
  value: T
}

export type FlowCotextFn<T> = (
  props: FlowProps<T>
) => (requestContext: RequestContext) => HttpResult | Promise<HttpResult>
export type FlowSimpleFn<T> = (
  props: FlowProps<T>
) => HttpResult | Promise<HttpResult>

export type FlowFn<T> = FlowSimpleFn<T> | FlowCotextFn<T>

export const flow = <T>(
  type: Type<T> | Type<T>["decode"],
  raw: (req: Request) => unknown,
  fn: FlowFn<T>
) =>
  result(
    auth((user) =>
      decodeCustom(type, raw, (value) => {
        const r = fn({ user, value })
        if (typeof r === "function") {
          return r
        }
        return () => r
      })
    )
  )

export const get = <T>(
  path: string,
  type: Type<T> | Type<T>["decode"],
  fn: FlowFn<T>
) =>
  getBase(
    path,
    flow(type, (req) => req.query, fn)
  )

export const post = <T>(
  path: string,
  type: Type<T> | Type<T>["decode"],
  fn: FlowFn<T>
) =>
  postBase(
    path,
    flow(type, (req) => req.body, fn)
  )
