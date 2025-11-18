import Footer from "@/components/body/footer";
import CookiesBanner from "@/components/body/cookie-banner";

import { readConfig } from "@/lib/readConfig";

export async function generateMetadata() {
  const config = readConfig();

  return {
    title: {
      template: `%s | ${config.SiteName}`,
      default: config.SiteName,
    },
  };
}

function MainPageLayout({ children }) {
  const config = readConfig();

  return (
    <section>
      {children}
      <CookiesBanner />
      <Footer conf={config} />
    </section>
  );
}

export default MainPageLayout;
