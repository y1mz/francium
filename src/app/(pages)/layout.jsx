import Footer from "@/components/body/footer"
import CookiesBanner from "@/components/body/cookie-banner"

import { readConfig } from "@/lib/readConfig"

function MainPageLayout({ children }) {
    const config = readConfig()

    return (
        <section>
            {children}
            <CookiesBanner />
            <Footer conf={config} />
        </section>
    )
}

export default MainPageLayout
