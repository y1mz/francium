import fs from 'fs'
import path from 'path'

function readConfig() {
    const confFile = fs.readFileSync(path.join(path.resolve("config"), "siteconfig.json"), 'utf8')

    const fileContent = JSON.parse(confFile)
    return fileContent
}

export { readConfig }