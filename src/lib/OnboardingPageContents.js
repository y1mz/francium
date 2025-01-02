import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function GetPagesContent() {
    const dir = fs.readdirSync(path.resolve("config/onboarding"))
    const files = dir.filter((file) => file.endsWith(".md"))

    let contents = []

    for (let i = 0; i < files.length; i++) {
        contents[i] = {
            page: i + 1,
            MarkContent: matter(fs.readFileSync(path.join(path.resolve("config/onboarding"), files[i]), 'utf8')).content,
        }
    }

    return contents
}

export { GetPagesContent }