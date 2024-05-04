"use server"

import AboutHeader from "@/components/about/header"

async function AboutPage() {
    return (
        <div className="mx-auto max-w-[768px] px-5">
            <AboutHeader 
                title="About"
            />
            <div>
               <article className="prose dark:prose-invert md:prose-lg lg:prose-xl">
                    <h2>Hello world</h2>
                    <p>This is a styling test!</p>
               </article>
            </div>
        </div>
    )
}

export default AboutPage