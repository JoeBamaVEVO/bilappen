import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

export async function getUserFromDbDuringLogin({ email, password }: { email: string, password: string }) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (!user || !user.password) {
      return null
    }
    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      return null
    }
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}