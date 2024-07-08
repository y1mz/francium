import AboutHeader from "@/components/about/header"
import LinkCheckerBox from "@/components/shorter/link-checker"
import PageRooter from "@/components/body/page-footer"

function CheckUrlPage() {
    return (
        <div className="mx-auto max-w-[768px] px-5 py-10">
            <AboutHeader
                title="Get shortURl details"
            />
            <div className="flex flex-col py-10">
                <LinkCheckerBox />
            </div>
            <PageRooter />
        </div>
    )
}

export default CheckUrlPage