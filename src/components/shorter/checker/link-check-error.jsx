function LinkCheckError({ e_code, e }) {

    return (
        <div className="bg-rose-900/20 justify-center items-center text-center rounded-md border border-rose-900">
            <div className="p-2 flex flex-col gap-2">
                <p className="p-2 font-semibold">404: Given short-url doesn't exists on server.</p>
            </div>
        </div>
    )
}

export default LinkCheckError