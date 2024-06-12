import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

function LinkErrorComp({ e, e_code }) {
    if (!e) {
        return null
    }

    return (
        <div className="bg-rose-900/20 justify-center items-center text-center rounded-md border border-rose-900">
            <div className="p-2 flex flex-col gap-2">
                <p className="p-2 font-semibold">There was an error. Please try again. This incident has reported.</p>
                <Accordion type="single" collapsible className="w-full px-10">
                    <AccordionItem value="error">
                        <AccordionTrigger>Error details.</AccordionTrigger>
                        <AccordionContent>
                            <pre>
                                <code className="relative rounded-md p-2 bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                    {e_code}: {e}
                                </code>
                            </pre>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default LinkErrorComp