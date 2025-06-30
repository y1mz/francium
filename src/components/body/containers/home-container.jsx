import LinkShorterBox from "../../shorter/link-shorter"
import HomeFAQ from "../home/home-faq-section"
import InfoSection from "../home/info-section"
import PageRooter from "@/components/body/page-footer"
import AnnouncementAlert from "@/components/body/announcement-alert"

import { Bebas_Neue } from "next/font/google"

const bebas = Bebas_Neue({
    weight: '400',
    subsets: ["latin"]
})

function HomeContainer({ config }) {
    const items = config.HomePage.InfoSection

    return (
        <div className="w-full mx-auto flex flex-col mb-20">
            <div>
                <div className="w-screen min-h-[70vh] md:min-h-[85vh] overflow-x-hidden
                bg-gradient-to-br from-purple-300 to-indigo-300 dark:from-purple-900 dark:to-indigo-800
                    rounded-b-2xl shadow-lg transition-all duration-100
                ">
                    <div className="max-w-[768px] mx-auto sm:pt-20">
                        <div className="p-5 sm:px-16 sm:pt-10">
                            <AnnouncementAlert/>
                            <h1 className={`text-center text-6xl font-bold pt-20 ${bebas.className}`}>{config.SiteName}</h1>
                            <p className="text-center font-semibold text-lg sm:mb-12 mb-2 mt-2">{config.SiteDescription}</p>
                            <LinkShorterBox/>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-[768px]">
                    {config.HomePage.EnableHomePageContent && (
                        <div className="px-5">
                            <InfoSection items={items}/>
                            <HomeFAQ conf={config}/>
                            <PageRooter/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeContainer