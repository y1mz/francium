import fs from "fs"
import path from "path"

import { logger } from "@/lib/logger"

async function auditLogger(type, message, date, modId) {
    const logFilePath = path.join(path.resolve("config/logs"), "auditLog.json")

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

        const newEntry = {
            type: type,
            message: message,
            logDate: new Date(date),
            userId: userId
        }

        log.push(newEntry)
        writeLogFile(log)

        console.log(`[${new Date(date)}]`, type, message)

        return true

    } catch (e) {
        await logger("ERROR", "[AUDIT_LOGGER]", e.message, (new Date().toDateString()), modId)
    }
}

export { auditLogger }
