import NextAuth from "next-auth"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    adapter: PrismaAdapter(db),
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
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: String(profile.id),
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: profile.role ?? 'USER'
                }
            }
        })
    ],
    callbacks: {
        async session({ session, user }) {

            const usrSettings = await db.userPreferences.findUnique({
                where: {
                    userId: user.id
                }
            })

            if (!usrSettings) {
                 await db.userPreferences.create({
                    data: {
                        userId: user.id
                    }
                })
            }

            if (user.email === process.env.AdminMail) {
                await db.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        role: "ADMIN"
                    }
                })
            }

            session.user.id = user.id
            session.user.role = (user.email === process.env.AdminMail) ? "ADMIN" : user.role
            session.user.banned = user.isBanned
            session.settings = {...usrSettings}
            
            return session
        }
    },
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-out',
        // error: '/error',
        newUser: '/sign-in/onboarding'
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions)

export const { GET, POST } = handlers