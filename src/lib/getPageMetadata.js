import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function getPageContent(page) {
    // Read page files over ".config/pages/x.md"
    const dir = path.resolve('./config', 'pages')
    const file = `${dir}/${page}.md`
    const content = fs.readFileSync(file, 'utf8')

    return matter(content)
}

export { getPageContent }