import { Button } from "@/components/ui/button"
import Link from "next/link"

function LinkReached() {
    return (
        <div className="bg-rose-900/20 justify-center items-center text-center rounded-md border border-rose-900">
            <div className="p-2 flex flex-col gap-2">
                <p className="p-2 font-semibold">You've reached your limit, please sign in to continue.</p>
            </div>
        </div>
    )
}

export default LinkReached