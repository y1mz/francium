import { Skeleton } from "../ui/skeleton"

function LinkLoadingBox() {

    return (
        <div
            className="relative rounded-lg bg-white/10 hover:bg-white/20  w-[300px] shadow-lg hover:shadow-none tansition duration-200 h-48 px-12 md:px-0"
        >
            <div className="flex flex-col gap-4 p-5">
                <Skeleton className="h-10 w-[220px] dark:bg-white/40" />
                <Skeleton className="h-5 w-[100px] dark:bg-white/40" />
            </div>
        </div>
    )
}

export default LinkLoadingBox