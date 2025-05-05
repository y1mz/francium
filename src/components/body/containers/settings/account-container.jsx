"use client"

import { CheckCircle, AlertCircle, Clock, XCircle } from "lucide-react"

import { useSession } from "next-auth/react"

function SettingsAccountContainer({ siteConf, userBans }) {
    const { data: session } = useSession()

    const BanCard = ({ type, reason, bannedAt, bannedUntil, banDuration, isActive }) => {

        const statusIcons = {
            "warning": <AlertCircle className="h-6 w-6 text-yellow-600" />,
            "temp": <Clock className="h-6 w-6 text-red-700" />,
            "perma": <XCircle className="h-6 w-6 text-red-500" />
        }

        const statusTexts = {
            "warning": "URL has removed.",
            "temp": "Account restricted",
            "perma": "Account has suspended."
        }

        return (
            <div className="max-w-[600px] rounded-lg bg-white dark:bg-[#1E2130] p-6 mb-6">
                <div className="flex items-center gap-4">
                    {statusIcons[type]}
                    <div>
                        <p className="font-semibold text-lg">{statusTexts[type]}</p>
                        <p className="text-sm font-medium text-muted-foreground">{reason}</p>
                        <div className="flex gap-2 mt-2 items-center">
                            <span className={`py-1 px-2 rounded-full text-xs font-light ${
                                !isActive ? "dark:bg-green-500/20 dark:text-green-400 bg-green-700/30 text-green-800"  : "bg-orange-500/20 text-orange-400"
                            }`}>
                                {isActive ? "Active" : "Expired"}
                            </span>
                            {type !== "perma" && (
                                <p className="font-medium text-muted-foreground text-xs">Duration : {banDuration}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="space-y-6">
            <div>
                <h1 className="font-bold text-3xl md:text-4xl">Account Settings</h1>
                <p className="text-sm text-muted-foreground">Manage your account.</p>
            </div>
            <div className="px-2 space-y-4">
                <h2 className="font-semibold text-2xl">
                        Account Status
                </h2>
                <div className="max-w-[600px] rounded-lg bg-white dark:bg-[#1E2130] p-6 mb-6">
                    <div className="flex items-center gap-6">
                        {session?.user.banned ? (
                            <>
                                <XCircle className="h-6 w-6 text-red-500" />
                                <div>
                                    <div className="flex items-center gap-2 font-bold text-lg">
                                        <h3>Account Status: </h3>
                                        <p className="text-red-500">Restricted</p>
                                    </div>
                                    <p className="font-medium text-sm text-muted-foreground">Your account got restricted from using {siteConf?.SiteName}.</p>
                                    <p className="font-medium text-sm text-muted-foreground">You can still access to your saved data.</p>
                                </div>
                            </>

                        ) : (
                            <>
                                <CheckCircle className="h-6 w-6 text-green-500"/>
                                <div>
                                    <div className="flex items-center gap-2 font-bold text-lg">
                                        <h3>Account Status: </h3>
                                        <p className="text-green-500">Operational</p>
                                    </div>
                                    <p className="font-medium text-sm text-muted-foreground">Your account is good standing!</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="px-2 space-y-4">
                <h2 className="font-semibold text-2xl">
                    Recent warnings and restrictions
                </h2>
                <div className="space-y-3 max-w-[600px]">
                    {userBans.length ? (
                        <>
                            {userBans.map((item, index) => (
                                <BanCard key={index} type={item.type} reason={item.reason} />
                            ))}
                        </>
                    ) : (
                        <div className="rounded-lg bg-white dark:bg-[#1E2130] p-6 mb-6 text-center items-center">
                            <p>Nothing there, that's great!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SettingsAccountContainer