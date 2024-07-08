import { Github, Info, SquareCheckBig } from "lucide-react"
import Link from "next/link"

function PageRooter() {
    return (
        <footer className="w-full py-5">
            <div className="mx-auto text-center">
                <div className="flex gap-3 justify-center">
                    <Link href="/about"><Info className="h-6 w-6" /> </Link>
                    <Link href="/check"><SquareCheckBig className="h-6 w-6" /> </Link>
                    <Link href="https://github.com/B4tuhanY1lmaz/francium"><Github className="h-6 w-6" /> </Link>
                </div>
                <p>Francium by <a href="https://www.yyilmaz.com.tr" className="hover:underline font-bold">Batuhan Y. Yılmaz</a></p>
            </div>
        </footer>
    )
}

export default PageRooter