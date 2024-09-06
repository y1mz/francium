import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import faq from "../../../../config/faqSection.json"
import conf from "../../../../config/siteconfig.json"

function HomeFAQ() {
    const faoq = conf.HomePage.Accordions
    return (
        <div className="py-5 md:p-5">
            <div className="px-8 md:px-20 py-5 border border-white/20 backdrop-blur-sm bg-white/10 rounded-lg shadow-lg">
                <h2 className="font-bold text-2xl">F.A.Q</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faoq.map((faq) => (
                        <AccordionItem value={faq.title} key={faq.title}>
                            <AccordionTrigger>{faq.title}</AccordionTrigger>
                            <AccordionContent>
                                {faq.description}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

export default HomeFAQ