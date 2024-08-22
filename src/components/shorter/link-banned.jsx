import config from "&/siteconfig.json"

function LinkBannedComp({ siteName }) {

    return (
        <div className="bg-rose-900/20 justify-center items-center text-center rounded-md border border-rose-900">
            <div className="p-2 flex flex-col gap-2">
                <p className="p-2 font-semibold">You got banned from using {config.SiteName}.</p>
            </div>
        </div>
    )
}

export default LinkBannedComp