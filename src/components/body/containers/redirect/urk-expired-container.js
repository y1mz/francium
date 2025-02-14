import PageRooter from "@/components/body/page-footer"
import AboutHeader from "@/components/about/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function UrlExpiredContainer() {

    return (
        <div>
            <AboutHeader title={"Url has expired"} />
            <div className="w-full flex items-center justify-center py-16 min-h-[50vh]">
                <Button variant={"outline"} asChild className="w-full max-w-md">
                    <Link href={"/"}>Return homepage</Link>
                </Button>
            </div>
            <PageRooter />
        </div>
    )
}

export default UrlExpiredContainer