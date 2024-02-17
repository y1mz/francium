"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function LinkShorterBox() {
    return (
        <div className="flex gap-1 md:px-20">
            <Input type="url" placeholder="Link to be shorted" />
            <Button variant="outline">Short!</Button>
        </div>
    )
}

export default LinkShorterBox