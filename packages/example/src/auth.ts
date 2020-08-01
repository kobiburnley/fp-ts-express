import {tryCatch} from "fp-ts/lib/TaskEither"

export const auth = (token: string) => tryCatch(
    async () => ({email: token}),
    e => e as Error
)