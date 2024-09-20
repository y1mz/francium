import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />

            {/* Card acting as a modal */}
            <Card className="w-full max-w-md mx-auto z-10">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">

                    {/* Content skeletons */}
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />

                    {/* Button skeleton */}
                    <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
            </Card>
        </div>
    )
}