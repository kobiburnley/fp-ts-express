import { RequestHandler, Router } from "express"

export type RequestHandlerFP = (
  path: string,
  ...handlers: RequestHandler[]
) => (router: Router) => void

export const use: RequestHandlerFP = (path, ...handlers) => (router: Router) => {
  router.use(path, handlers)
}

export const get: RequestHandlerFP = (path, ...handlers) => (router: Router) => {
  router.get(path, handlers)
}

export const post: RequestHandlerFP = (path, ...handlers) => (router: Router) => {
  router.post(path, handlers)
}

export const put: RequestHandlerFP = (path, ...handlers) => (router: Router) => {
  router.put(path, handlers)
}

export const del: RequestHandlerFP = (path, ...handlers) => (router: Router) => {
  router.delete(path, handlers)
}
