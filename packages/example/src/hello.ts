import { HelloRequestV2, User } from "./model"

export const hello = async ({
  user,
  value: request,
}: {
  user: User
  value: HelloRequestV2
}) => {
  try {
    if (Math.random() < 0.33) {
      throw new Error("Database error")
    }
    if (Math.random() < 0.66) {
      return { status: 429, value: { message: "Too Many Requests" } }
    }

    return {
      status: 200,
      headers: {
        "X-Magic": "Tada",
      },
      value: {
        user,
        request,
      },
    }
  } catch (e) {
    return { status: 500, value: { message: "Internal Server Error" } }
  }
}
