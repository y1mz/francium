"use client"

import { useSession, signIn } from "next-auth/react"

import { CardFooter, Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { FcGoogle } from "react-icons/fc"
import { ImGithub } from "react-icons/im"
import { FaDiscord } from "react-icons/fa6"
import { Mail } from "lucide-react"

function SignInCard({ conf, callbackUrl }) {
    const { data: session } = useSession()

    let configuration = conf.Auth
    let callUrl = conf.SiteUrl

    if (callbackUrl) {
        callUrl = callbackUrl
    }

    const handleDiscordLogin = () => {
        signIn("discord", { callbackUrl: callUrl })
    }

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: callUrl })
    }

    const handleGithubLogin = () => {
        signIn("github", { callbackUrl: callUrl })
    }

    return (
        <Card className="max-w-md w-full mx-auto animated-card rounded-2xl">
            <div className="p-6">
                <h2 className="font-bold text-2xl">
                    Sign in
                </h2>
                <p className="text-sm text-muted-foreground">
                    Sign in with your preferred provider.
                </p>
            </div>
            <CardContent>
                <div className="w-full flex flex-col gap-2">
                    <Button
                        className="bg-green-800 dark:bg-green-100 items-center"
                        onClick={() => handleGoogleLogin()}
                    >
                        <FcGoogle className="text-lg mr-2"/> Continue with Google
                    </Button>
                    {configuration?.EnableGithubAuth &&
                        <Button
                            className="bg-stone-800 hover:bg-stone-900 text-white items-center"
                            onClick={() => handleGithubLogin()}
                        >
                            <ImGithub className="text-lg mr-2"/> Continue with Github
                        </Button>
                    }
                    {configuration?.EnableDiscordAuth &&
                        <Button
                            className="bg-indigo-600 hover:bg-indigo-800 text-white items-center"
                            onClick={() => handleDiscordLogin()}
                        >
                            <FaDiscord className="text-lg mr-2"/> Continue with Discord
                        </Button>
                    }
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="ghost">
                    <Link href={callUrl}>Cancel</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default SignInCard