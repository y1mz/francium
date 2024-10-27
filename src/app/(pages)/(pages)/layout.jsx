import PageRooter from "@/components/body/page-footer"

function PagesPageLayout({ children }) {
    return (
        <section>
            {children}
            <PageRooter />
        </section>
    )
}

export default PagesPageLayout