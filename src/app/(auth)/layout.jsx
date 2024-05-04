function AuthLayout({ children }) {
    return (
        <section>
            <div className="mx-auto max-w-[768px]">
                {children}
            </div>
        </section>
    )
}

export default AuthLayout