import { left, right } from "fp-ts/lib/Either"
import { HelloRequestV2, User } from "./model"

export const hello = (user: User, request: HelloRequestV2) => async () => {
  try {
    if (Math.random() < 0.33) {
      throw new Error("Database error")
    }
    if (Math.random() < 0.66) {
      return left({ status: 429, value: { message: "Too Many Requests" } })
    }

    return right({
      user,
      request,
    })
  } catch (e) {
    return left({ status: 500, value: { message: "Internal Server Error" } })
  }
}
