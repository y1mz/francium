import Footer from "@/components/body/footer"

function Layout({ children }) {
    return (
        <section>
            <Footer />
            <div className="mx-auto max-w-[768px]">
                <div className="justify-center items-center">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default Layout