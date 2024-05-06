import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function getModalContent(modal) {
    // Read page files over ".config/modals"
    const dir = path.resolve('./config', 'modals')
    const file = `${dir}/${modal}.md`
    const content = fs.readFileSync(file, 'utf8')

    return matter(content)
}

function getPageContent(page) {
    // Read page files over ".config/pages/x.md"
    const dir = path.resolve('./config', 'pages')
    const file = `${dir}/${page}.md`
    const content = fs.readFileSync(file, 'utf8')

    return matter(content)
}

export { getPageContent, getModalContent }