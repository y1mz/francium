"use client"

function Footer() {
    return (
        <footer className="container mx-auto px-20 py-5 mt-auto fixed inset-x-0 bottom-0">
            <div className="">
                <div className="flex gap-3 text-center justify-center font-mono">
                    <p>Francium Project by <a href="https://github.com/B4tuhanY1lmaz" className="underline">B4tuhanY1lmaz</a>.</p>
                    <a href="/faq" className="underline">F.A.Q</a>
                    <a href="/about" className="underline">About</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer