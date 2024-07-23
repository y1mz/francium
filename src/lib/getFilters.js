const fs = require("fs")
const path = require("path")

async function getFilters() {
    const writeDir = path.resolve("config/filters")
    // check if dir exists
    if (!fs.existsSync(writeDir)) {
        console.log(`"${writeDir}" doesn't exists. Creating dir.`)
        fs.mkdirSync(writeDir)
    }

    const Urls = [
        "https://blocklistproject.github.io/Lists/alt-version/ads-nl.txt",
        "https://blocklistproject.github.io/Lists/alt-version/porn-nl.txt",
        "https://blocklistproject.github.io/Lists/alt-version/scam-nl.txt",
        "https://blocklistproject.github.io/Lists/alt-version/gambling-nl.txt"
    ]

    for (let i = 0; i < Urls.length; i++) {
        try {
            console.log("Fetching url: ", Urls[i])
            const response = await fetch(Urls[i]).then((res) => res.text()).then((res) => res.split("\n"))
            
            console.log("Parsing filter content from url: ", Urls[i])
            const useLessSection = response.filter((item) => item.startsWith("#"))
            const mainContent = response.slice(useLessSection.length, (response.length - 1))
            const JSONContent = JSON.stringify(mainContent, null, "\t")

            const fileName = "filter_" + i + ".json";
            fs.writeFileSync(path.join(writeDir, fileName), JSONContent)
            console.log("Filter successfully written to ", path.join(writeDir, fileName))
        } catch (e) {
            console.log("Error while getting filter from ", `${Urls[i]}: `,  e.message)
        }
        console.log("\n")
    }
}

try {
    getFilters()
} catch (e) {
    console.log("There was an error while fetching filters.")
    console.log(e)
}