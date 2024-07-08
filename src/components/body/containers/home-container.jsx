import config from "../../../../config/siteconfig.json"
import items from "../../../../config/infoSection.json"

import { Bebas_Neue } from "next/font/google"
import LinkShorterBox from "../../shorter/link-shorter"
import HomeFAQ from "../home/home-faq-section"
import InfoSection from "../home/info-section"
import HeaderEffect from "../home/header-effect"
import PageRooter from "@/components/body/page-footer"

const bebas = Bebas_Neue({
    weight: '400',
    subsets: ["latin"]
})

function HomeContainer() {
    return (
        <div className="container w-full mx-auto flex flex-col mb-20 py-5 sm:py-28">
            <div className="relative">
                <div className="absolute top-0 left-20 w-48 h-48 sm:w-72 md:h-72 bg-purple-300 dark:bg-purple-400/90 rounded-full  mix-blend blur-2xl opacity-70" />
                <div className="absolute top-0 right-20 md:w-72 w-48 h-48 sm:h-72 bg-yellow-300 dark:bg-yellow-400/90 rounded-full mix-blend blur-2xl opacity-70"/>
                <div className="absolute top-6 left:36 md:left-44 md:w-72 w-48 h-48 sm:h-72 bg-pink-300 dark:bg-pink-400/90 rounded-full mix-blend blur-2xl opacity-60" />
                <div className="absolute mx-auto w-full">
                    <div className="flex flex-col gap-5 mb-44">
                        <HeaderEffect text="Vexxit Link Shortener" />
                        <p className="text-center font-semibold text-lg pb-10">{config.SiteDescription}</p>
                        <LinkShorterBox />
                    </div>
                    <div className="mb-20">
                        <InfoSection 
                            items={items}
                        />
                        <HomeFAQ />
                        <PageRooter />
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default HomeContainer