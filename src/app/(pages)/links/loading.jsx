import AboutHeader from "@/components/about/header"
import { Separator } from "@/components/ui/separator"
import LinkLoadingBox from "@/components/shorter/link-box-loading"

function Loading() {
    return (
        <div>
            <AboutHeader title="My Links" />
            <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-20">
                <div className="flex flex-col gap-2 py-5">
                    <Separator className="bg-gray-700 dark:bg-white/20"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading