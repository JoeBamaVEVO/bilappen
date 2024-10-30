import { hash } from "bcryptjs"

export async function saltAndHashPassword (password: string): Promise<string> {
    const salt: number | string | undefined = process.env.SALT_HASH 
    if (!salt) {
        throw new Error("Salt is not defined in the environment variables")
    }
    const hashedPassword = await hash(password, 10)
    return hashedPassword.toString()
}

