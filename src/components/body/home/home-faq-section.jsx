import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function HomeFAQ() {
    return (
        <div className="md:px-20 py-5">
            <h2 className="font-bold text-2xl">F.A.Q</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Accordion 1</AccordionTrigger>
                    <AccordionContent>
                        Here is an example Accordion! <p className="underline">Testt</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Accordion 3</AccordionTrigger>
                    <AccordionContent>
                        Here is an example Accordion! <p className="underline">Testt</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Accordion 2</AccordionTrigger>
                    <AccordionContent>
                        Here is an example Accordion! <p className="underline">Testt</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default HomeFAQ