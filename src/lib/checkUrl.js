import fs from "fs"
import path from "path"

async function CheckUrl(url) {
    const FilterDir = fs.readdirSync(path.resolve("config/filters"))

    if (!FilterDir.length) {
        console.log("[SHORT_URL_CHECK][WARN] Filters aren't initialized! \n", "Please run 'npm run filters' to initialize them.")
    }

    const FilterContent = FilterDir.filter((item) => item.endsWith(".json"))
    let FilterStatus;

    for (let i = 0; i < FilterContent.length; i++) {
        const rawContent = fs.readFileSync(path.join(path.resolve("config/filters"), FilterContent[i]))
        const jsonContent = JSON.parse(rawContent)

        if (jsonContent.indexOf(url) !== -1) {
            FilterStatus = 1
        } else FilterStatus = 0
    }
    return FilterStatus
}

export { CheckUrl }