import { Inter } from "next/font/google";
import "./globals.css";
import conf from "/config/siteconfig.json"

import Script from "next/script"
import ThemesProvider from "@/components/providers/theme-provider"
import ModalProvider from "@/components/providers/modal-provider"
import ServerSessionProvider from "@/components/providers/session-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: conf.SiteName,
  description: conf.SiteDescription,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {conf.Ackee.useAckee && <Script async src={`${conf.Ackee.AckeeUrl}/tracker.js`} data-ackee-server={conf.Ackee.AckeeUrl} data-ackee-domain-id={conf.Ackee.AckeeDomainId} />}
        <body className={`min-h-screen overflow-x-hidden py-10 bg-[#E1E5F4] dark:bg-[#080e1e] scroll-smooth ${inter.className}`}>
            <ServerSessionProvider>
                <ThemesProvider
                    attribute="class"
                    defaultTheme="dark"
                    disableTransitionOnChange
                >
                    <ModalProvider/>
                    {children}
                </ThemesProvider>
            </ServerSessionProvider>
        </body>
    </html>
  )
}
