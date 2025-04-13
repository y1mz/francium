function SettingsHeader({ title }) {

    return (
        <header className="relative w-full h-[30vh]
            bg-gradient-to-br from-purple-300 to-indigo-300
            dark:from-purple-900 dark:to-indigo-800 rounded-b-2xl shadow-lg"
        >
            <h1 className="justify-center items-center text-center font-bold text-4xl pt-32">{title}</h1>
        </header>
    )
}

export default SettingsHeader