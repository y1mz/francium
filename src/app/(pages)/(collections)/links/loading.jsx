import AboutHeader from "@/components/about/header"
import LinkLoadingBox from "@/components/shorter/link-box-loading"

function Loading() {
    return (
        <div className="pb-10">
            <AboutHeader title="My Links" />
            <div className="pb-12 px-5">
                <div className="flex flex-col gap-2 py-5">
                    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense gap-3">
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
                        <LinkLoadingBox/>
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