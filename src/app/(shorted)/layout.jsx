function Layout({ children }) {
    return (
        <section>
            <div className="w-full">
                <div className="justify-center items-center">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default Layout