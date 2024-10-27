function AuthLayout({ children }) {
    return (
        <section>
            <div className="mx-auto animated-background bg-gradient-to-br from-[#E1E5F4] to-indigo-300 dark:from-[#080e1e] dark:to-purple-600">
                {children}
            </div>
        </section>
    )
}

export default AuthLayout