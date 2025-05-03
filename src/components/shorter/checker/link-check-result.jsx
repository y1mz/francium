import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link"
import LinkReportButton from "./link-report-button"


function LinkCheckResult({ result }) {

    return (
        <div className="p-4 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm">
            <div className="flex flex-col gap-4">
                <p className="font-bold text-lg">Short-url details:</p>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                        <p className="whitespace-nowrap font-bold">Name: </p>
                        <p className="truncate text-sm">{result.metaName}</p>
                    </div>
                    <Separator className="bg-white/50 px-10"/>
                    <div className="flex gap-3">
                        <p className="whitespace-nowrap font-bold">Description: </p>
                        <p className="line-clamp-2 text-sm">{result.metaDesc}</p>
                    </div>
                    <Separator className="bg-white/50 px-10"/>
                    <div className="flex gap-3">
                        <p className="whitespace-nowrap font-bold">Url: </p>
                        <code className="line-clamp-1 text-sm rounded px-[0.3rem] py-[0.2rem] font-mono">{result.link}</code>
                    </div>
                    {result.metaImageUrl && <>
                        <Separator className="bg-white/50 px-10" />
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">OpenGraph Image:</p>
                            <img
                                src={result.metaImageUrl}
                                alt={`OpenGraph Image for ${result.metaName}`} className="rounded-lg"
                            />
                        </div>
                    </>}
                </div>
                <div className="flex gap-2 w-full">
                    <LinkReportButton url={result.link} slug={result.slug}/>
                    <Button variant="outline" className="flex-grow" asChild><Link href={result.link}>Visit url</Link></Button>
                </div>
            </div>
        </div>
    )
}

export default LinkCheckResult