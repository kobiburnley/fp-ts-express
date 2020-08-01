import { Router } from "express"
import { RouterConfig } from "./routerConfig"

export const router = (path: string, ...children: RouterConfig[]) => (router: Router) => {
  const childRouter = Router()

  for (const child of children) {
    child(childRouter)
  }

  router.use(path, childRouter)

  return childRouter
}
