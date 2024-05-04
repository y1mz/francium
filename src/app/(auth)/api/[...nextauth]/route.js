import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google"


import { FirestoreAdapter } from "@auth/firebase-adapter"
import { firestore } from "../../../../../firebase/server"

export const authOptions = {
    adapter: FirestoreAdapter(firestore),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.username,
                    email: profile.email,
                    image: profile.image_url,
                    role: profile.role ?? 'USER'
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role ?? 'USER'
                }
            }
        })
    ],
    callbacks: {
        session({ session, user }) {
            session.user.role = user.role
            return session
        }
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)

export const { GET, POST } = handlers