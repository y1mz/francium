import { readConfig } from "@/lib/readConfig"

import HomeContainer from "@/components/body/containers/home-container"

// Make sure this page gets updated.
export const dynamic = "force-dynamic"

function Home() {
    const config = readConfig()
  return (
    <main>
      <div className="mx-auto">
        <HomeContainer
            config={config}
        />
      </div>
    </main>
  );
}

export default Home
