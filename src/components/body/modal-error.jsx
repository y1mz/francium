function ModalError({ message }) {
    return (
        <div className="bg-rose-900/20 justify-center items-center text-center rounded-md border border-rose-900">
            <div className="p-2 flex flex-col gap-2">
                <p className="p-2 font-semibold">{message}</p>
            </div>
        </div>
    )
}

export default ModalError