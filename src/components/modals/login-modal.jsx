"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useModal } from "./hooks/modal-hook"
import { redirect } from "next/navigation"
import { useSession, signIn } from "next-auth/react"
import Link from "next/link"

import { FcGoogle } from "react-icons/fc"
import { ImGithub } from "react-icons/im"
import { FaDiscord } from "react-icons/fa6"

function LoginModal() {
    // Disable Modal outside the sign-in page
    if (window.location.pathname !== "/sign-in") {
        return
    }

    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "login"
    const { callbackUrl, configuration } = data
    const { data: session } = useSession()
    
    const handleDiscordLogin = () => {
        signIn("discord", { callbackUrl: callbackUrl }).then(redirect(callbackUrl))
        return onClose()
    }

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: callbackUrl }).then(redirect(callbackUrl))
    }

    const handleGithubLogin = () => {
        signIn("github", { callbackUrl: callbackUrl }).then(redirect(callbackUrl))
    }

    return (
        <Dialog open={isModalOpen}>
            {session ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            You already logged in
                        </DialogTitle>
                    </DialogHeader>
                        <Button onClick={() => onClose()} asChild>
                            <Link href={"/"}>Click here to go back to homepage.</Link>
                        </Button>
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Log in or Sign up
                        </DialogTitle>
                    </DialogHeader>
                    <Button
                        className="bg-white items-center"
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
                    {configuration.EnableDiscordAuth && 
                        <Button
                            className="bg-indigo-600 hover:bg-indigo-800 text-white items-center"
                            onClick={() => handleDiscordLogin()}
                        >
                            <FaDiscord className="text-lg mr-2"/> Continue with Discord
                        </Button>
                    }
                    <DialogFooter>
                        <Button asChild variant="ghost">
                            <Link href={callbackUrl} onClick={() => onClose()}>Cancel</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default LoginModal