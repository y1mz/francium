"use client"

import { CardFooter, Card, CardContent,
    CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useSession } from "next-auth/react"

function NewUserPage() {
    return (
        <div
            className="flex justify-center items-center inset-0 h-dvh mx-auto w-full"
        >
            <Card className="max-w-md w-full mx-auto animated-card">
                <div className="p-6">
                    <h2 className="font-bold text-2xl">
                        Welcome to Vexxit.xyz!
                    </h2>
                    <p className="text-sm text-muted-foreground">

                    </p>
                </div>
                <CardContent>
                    <div className="w-full flex flex-col gap-2">

                    </div>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </div>
    )
}

export default NewUserPage