import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDbDuringLogin } from "@/../prisma/database"
import { cp } from "fs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
        const { email, password } = credentials as { email: string, password: string }
  
        // logic to verify if the user exists
        user = await getUserFromDbDuringLogin({email:email, password:password})
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ], 
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.uuid = user.id
      }
      return {...token}
    },
    session({ session, token }) {
      session.user.uuid = token.uuid as string
      return session
    },
  },
})
