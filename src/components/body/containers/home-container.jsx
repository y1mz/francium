import LinkShorterBox from "../../shorter/link-shorter"
import HomeFAQ from "../home/home-faq-section"
import InfoSection from "../home/info-section"
import HeaderEffect from "../home/header-effect"
import PageRooter from "@/components/body/page-footer"
import AnnouncementAlert from "@/components/body/announcement-alert";

function HomeContainer({ config }) {
    const items = config.HomePage.InfoSection

    return (
        <div className="container w-full mx-auto flex flex-col mb-20 py-5 sm:py-28">
            <AnnouncementAlert />
            <div className="relative h-screen">
                <div
                    className="absolute top-0 left-20 w-48 h-48 sm:w-72 md:h-72 bg-purple-300 dark:bg-purple-400/90 rounded-full  mix-blend blur-2xl opacity-70"/>
                <div
                    className="absolute top-0 right-20 md:w-72 w-48 h-48 sm:h-72 bg-yellow-300 dark:bg-yellow-400/90 rounded-full mix-blend blur-2xl opacity-70"/>
                <div
                    className="absolute top-6 left:36 md:left-44 md:w-72 w-48 h-48 sm:h-72 bg-pink-300 dark:bg-pink-400/90 rounded-full mix-blend blur-2xl opacity-60"/>
                <div className="absolute mx-auto w-full">
                    <div className="mb-44">
                        <HeaderEffect text={config.HomePage.homeHeader}/>
                        <p className="text-center font-semibold text-lg mb-12 mt-2">{config.SiteDescription}</p>
                        <LinkShorterBox/>
                    </div>
                    {config.HomePage.EnableHomePageContent && (
                        <div className="mb-20">
                            <InfoSection
                                items={items}
                            />
                            <HomeFAQ conf={config} />
                            <PageRooter />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeContainer