import { readConfig } from "@/lib/readConfig"
import { ServerSession } from "@/lib/server-session"
import { redirect } from "next/navigation"

import HomeContainer from "@/components/body/containers/home-container"

export const dynamic = "force-dynamic"

async function Home() {
    const config = readConfig()
    const session = await ServerSession()

    if (session && session?.user.banned) {
        return redirect("/settings/account")
    }

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
