import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function getModalContent(modal) {
    const dir = path.resolve("./config", "modals")
    const file = `${dir}/${modal}.md`
    const content = fs.readFileSync(file, "utf8")

    return matter(content).content
}

function getAllPages() {
    const dir = path.resolve('./config', 'pages')
    const files = fs.readdirSync(dir)
    const mPages = files.filter((file) => file.endsWith(".md"))

    mPages.forEach((file) => {
        const content = fs.readFileSync(`${dir}/${file}`, "utf-8")
        const result = matter(content)

        return {
            slug: file.replace(".md", ""),
            content: result.content
        }
    })
}

function getPageContent(page) {
    // Read page files over ".config/pages/x.md"
    const dir = path.resolve('./config', 'pages')
    const file = `${dir}/${page}.md`
    const content = fs.readFileSync(file, 'utf8')

    return matter(content)
}

export { getPageContent, getAllPages, getModalContent }