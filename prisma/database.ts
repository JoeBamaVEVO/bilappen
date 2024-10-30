import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

export async function getUserFromDbDuringLogin({ email, password }: { email: string, password: string }) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })
  console.log("User found", user)
  if (!user || !user.password) {
    return null
  }
  const isPasswordValid = await compare(password, user.password)
  if (!isPasswordValid) {
    return null
  }
  if(user && isPasswordValid ) {
    console.log("User found and password is valid", user)
    return user
  }
}