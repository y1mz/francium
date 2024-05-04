import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import faq from "../../../../config/faqSection.json"

function HomeFAQ() {
    return (
        <div className="md:px-20 py-5">
            <h2 className="font-bold text-2xl">F.A.Q</h2>
            <Accordion type="single" collapsible className="w-full">
                {faq.map((faq) => (
                    <AccordionItem value={faq.title} key={faq.title}>
                        <AccordionTrigger>{faq.title}</AccordionTrigger>
                        <AccordionContent>
                            {faq.description}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default HomeFAQ