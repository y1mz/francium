"use client"

import { CardFooter, Card, CardContent,
    CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Markdown from "markdown-to-jsx"

import { useState } from "react"
import { redirect } from "next/navigation"

function OnBoardingCard({ pages }) {

    const [currentPage, setCurrentPage] = useState(0)
    const [position, setCurrentPosition] = useState("next")
    const [animationKey, setAnimationKey] = useState(0)

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPosition("next")
            setCurrentPage(currentPage + 1)
            setAnimationKey(animationKey + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPosition("prev")
            setCurrentPage(currentPage - 1)
            setAnimationKey(animationKey + 1)
        }
    }

    const finishOnboarding = () => {
        redirect("/")
    }

    return (
        <Card className="max-w-md w-full mx-auto rounded-2xl">
            <CardContent className="overflow-hidden p-6">
                <div
                    key={animationKey}
                    className={`slide-container ${position}`}
                >
                    <article className="prose-sm dark:prose-invert">
                        <Markdown
                            options={{
                                overrides: {
                                    h1: {
                                        component: "h1",
                                        props: {
                                            className: "font-semibold"
                                        }
                                    }
                                }
                            }}
                        >
                            {pages[currentPage].MarkContent}
                        </Markdown>
                    </article>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => prevPage()} disabled={currentPage == 0}>
                    Previous
                </Button>
                {(currentPage == pages.length - 1 ) ? (
                    <Button onClick={() => finishOnboarding()}>
                        Finish
                    </Button>
                ) : (
                    <Button onClick={() => nextPage()} disabled={currentPage == pages.length - 1}>
                        Next
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
export default OnBoardingCard