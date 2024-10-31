import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession["user"]
    }

    interface JWT {
        uuid: string
    }
    
    interface User{
        uuid: string
    }
}