import { Bebas_Neue } from "next/font/google"
import { Inter } from "next/font/google"

const bebas = Bebas_Neue({
    weight: '400',
    subsets: ["latin"]
})
const inter = Inter({ subsets: ["latin"] })

const Goodtext = () => {
    return (
        <div className={inter.className}>
            <p className="text-lg text-green-300 dark:text-green-200">
                There is nothing to worry about, everything looks good!
            </p>
        </div>
    )
}

const BadText = ({ reports }) => {
    return (
        <div className={inter.className}>
            <p className="text-lg text-red-300 dark:text-rose-200">
                There are {reports.length} reports needs to be processed.
            </p>
        </div>
    )
}

function AdminWelcomeHeader({ user, reports }) {
    return (
        <div className="mx-auto mb-5 h-56 w-full md:h-72">
            <div className="relative mx-auto">
                <div className="absolute top-4 -left-12 w-48 h-48 md:w-72 md:h-72 bg-purple-300 dark:bg-purple-400/90 rounded-full  mix-blend blur-2xl opacity-70"/>
                <div className="absolute inset-x-0 inset-y-0 pt-20">
                    <div className={`${bebas.className}`}>
                        <p className="text-6xl">Welcome back</p>
                        <p className="text-5xl">{user.name}!</p>
                        {!reports.length ? <Goodtext /> : <BadText reports={reports} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminWelcomeHeader