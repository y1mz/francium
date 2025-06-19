import fs from "fs"
import path from "path"
import { generateUUID } from "@/lib/generateUUID"

async function logger(type, place, message, date, userId, clientId) {
    const logFilePath = path.join(path.resolve("config/logs"), "clientLog.json")

    // Create Log file and directory if they don't exist.
    async function isFileExists() {
        const directory = path.dirname(logFilePath)

        if (!fs.existsSync(directory)) {
            console.log("Logs directory doesn't exits, creating.")
            await fs.mkdirSync(directory)
        }

        if (!fs.existsSync(logFilePath)) {
            console.log("clientLog.json file doesn't exits, creating.")
            await fs.writeFileSync(logFilePath, JSON.stringify([]))
        }

        if (fs.existsSync(directory) && fs.existsSync(logFilePath)) {
            return true
        } else {
            throw new Error("Failed to create log file or directory.")
        }
    }

    function readCurrentLog() {
        const fileContent = fs.readFileSync(logFilePath, "utf-8")
        const jsonLog = JSON.parse(fileContent)

        if (!fileContent) {
            throw new Error("Can't read clientLog.json file.")
        }

        return jsonLog
    }

    function writeLogFile(jsonData) {
        const logString = JSON.stringify(jsonData, null, "\t")
        try {
            fs.writeFileSync(logFilePath, logString)
        } catch (e) {
            throw new Error("Failed to write clientLog.json file.")
        }
    }

    try {
        await isFileExists()
        let log = readCurrentLog()
        let entryUUID = generateUUID(20)

        const newEntry = {
            id: entryUUID,
            type: type,
            place: place,
            message: message,
            logDate: new Date(date),
            clientId: clientId,
            userId: userId
        }

        log.push(newEntry)
        writeLogFile(log)

        console.log((type === "ERROR" ? '\x1b[31m%s\x1b[0m' : '\x1b[33m%s\x1b[0m'), `[${new Date(date)}]`, type, place, message, clientId)

        return true

    } catch (e) {
        console.log("[ERROR]: ", e.message)
    }
}

export { logger }