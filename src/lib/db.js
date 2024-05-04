import { PrismaClient } from "@prisma/client"

if (typeof global !== "undefined") {
    global.prisma = undefined;
} else if (typeof window !== "undefined") {
    window.prisma = undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db