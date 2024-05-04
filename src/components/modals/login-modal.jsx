"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useModal } from "./hooks/modal-hook"
import { redirect } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

function LoginModal() {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "login"

    const { data: session } = useSession()

    const handleOnClose = () => {
        onClose()
        redirect("/")
    }

    const handleDiscordLogin = () => {
        signIn("discord", { callbackUrl: '/' }).then(redirect("/"))
        return onClose()
    }

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: '/' }).then(redirect("/"))
    }

    const handleGithubLogin = () => {
        signIn("github", { callbackUrl: '/' }).then(redirect("/"))
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => handleOnClose()}>
            {session ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            You already logged in
                        </DialogTitle>
                    </DialogHeader>
                        <Button asChild>
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
                        className="bg-white"
                    >
                        Continue with Google
                    </Button>
                    <Button
                        className="bg-stone-800 hover:bg-stone-900 text-white"
                    >
                        Continue with Github
                    </Button>
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-800 text-white"
                        onClick={() => handleDiscordLogin()}
                    >
                        Continue with Discord
                    </Button>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default LoginModal