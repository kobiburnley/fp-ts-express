import { RequestHandler as ExpressRequestHandler, Router } from "express"

export type RequestHandler = (
  path: string,
  ...handlers: ExpressRequestHandler[]
) => (router: Router) => void

export const use: RequestHandler = (path, ...handlers) => (router: Router) => {
  router.use(path, handlers)
}

export const get: RequestHandler = (path, ...handlers) => (router: Router) => {
  router.get(path, handlers)
}
