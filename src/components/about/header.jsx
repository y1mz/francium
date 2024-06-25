function AboutHeader({ title }) {
    return (
        <div className="justify-center mx-auto mb-5 h-56 md:h-72">
            <div className="relative w-1/2 mx-auto">
                <div className="absolute top-12 -left-12 w-48 h-48 sm:w-72 md:h-72 bg-purple-300 dark:bg-purple-400/90 rounded-full  mix-blend blur-2xl opacity-70"/>
                <div className="absolute top-7 right-6 md:w-72 w-48 h-48 sm:h-72 bg-yellow-300 dark:bg-yellow-400/90 rounded-full mix-blend blur-2xl opacity-70"/>
                <div className="absolute top-8 -right-12 md:w-72 w-48 h-48 sm:h-72 bg-pink-300 dark:bg-pink-400/90 rounded-full mix-blend blur-2xl" />
                <div className="absolute inset-x-0 inset-y-0 pt-20 md:pt-32">
                    <h1 className="justify-center items-center text-center font-bold text-4xl">{title}</h1>
                </div>
            </div>
        </div>
    )
}

export default AboutHeader