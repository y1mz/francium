import { Inter } from "next/font/google";
import "./globals.css";
import conf from "/config/siteconfig.json"

import Script from "next/script"
import ThemesProvider from "@/components/providers/theme-provider"
import ModalProvider from "@/components/providers/modal-provider"
import ServerSessionProvider from "@/components/providers/session-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: conf.SiteName,
  description: conf.SiteDescription,
  keywords: [
      "NextJS", "Link shortener", "Url", "link",
      "shorten url", "make links shorter", "free",
      "free link shortener", "tinyurl", "social media", "twitter link shortener",
      "secure link shortener"
  ],
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL(
    `https://${conf.SiteUrl}` ?? "http://localhost:3000"
  ),
  openGraph: {
      url: conf.SiteUrl,
      siteName: conf.SiteName
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {conf.Ackee.useAckee &&
          <Script
            async src={`${conf.Ackee.AckeeUrl}/tracker.js`}
            data-ackee-server={conf.Ackee.AckeeUrl}
            data-ackee-domain-id={conf.Ackee.AckeeDomainId}
          />
      }
        <body className={`min-h-screen overflow-x-hidden bg-[#E1E5F4] dark:bg-[#080e1e] scroll-smooth ${inter.className}`}>
            <ServerSessionProvider>
                <ThemesProvider
                    attribute="class"
                    defaultTheme="system"
                    disableTransitionOnChange
                >
                    <ModalProvider/>
                    {children}
                </ThemesProvider>
            </ServerSessionProvider>
        <Toaster />
        </body>
    </html>
  )
}
