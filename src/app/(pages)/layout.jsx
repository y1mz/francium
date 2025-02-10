import { readConfig } from "@/lib/readConfig"

import MainPageCookieProvider from "@/components/providers/cookie-provider"
import Footer from "@/components/body/footer"

function MainPageLayout({ children }) {
    const conf = readConfig()

    return (
        <section className="pb-10">
            <MainPageCookieProvider>
                {children}
                <Footer SiteName={conf.SiteName} />
            </MainPageCookieProvider>
        </section>
    )
}

export default MainPageLayout