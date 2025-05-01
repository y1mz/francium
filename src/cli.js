import { program } from "commander"
import inquirer from "inquirer"
import { db } from "./lib/db"

program.version("1.0.0").description("CLI interface of Francium")

const AppAdmins = await db.user.findMany({
    where: {
        role: "ADMIN",
    }
})
const Users = await db.user.findMany()

const AdminSelectorFunction = async () => {
    inquirer.prompt([{
        type: "input",
        name: "email",
        message: "Please enter the email of administrator account: "
    }]).then(async (ans) => {
        const mail = ans.email

        if (!mail.length) {
            console.log("You need to set an administrator account")
            return AdminSelectorFunction()
        }

        try {
            const userUpdate = await db.user.update({
                where: {
                    email: mail
                },
                data: {
                    role: "ADMIN"
                }
            })

            if (userUpdate) {
                console.log("Successfully set user as administrator")
            }

        } catch (e) {
            console.log(`Error: User cannot be found. Please try again.`)
            return AdminSelectorFunction()
        }
    })
}

const functions = [
    async () => {
        inquirer.prompt([
            {
                type: "input",
                name: "email",
                message: "Please enter an email: ",
            }
        ]).then(async (ans) => {
            const results = await db.user.findMany({
                where: {
                    email: ans.email
                }
            })
            console.log(results)
        })
    },
    () => {
        console.log("Hello 2")
    }
]

const mainSelector = () => {
    inquirer.prompt([
        {
            type: "select",
            name: "options",
            message: "Hi There",
            choices: [
                {
                    name: "Test1",
                    value: 1,
                    description: "This is a test"
                },
                {
                    name: "Test2",
                    value: 2,
                    description: "This is a test"
                }
            ]
        }
    ]).then((ans) => {
        console.log(ans.options)
        functions[ans.options - 1]()
    })
}

program.action(() => {
    if (AppAdmins.length <= 0) {

        if (Users.length <= 0) {
            console.log("There isn't any user accounts in this instance of Francium.", "\n", "Please create an account and re-run this program.")
        } else {
            AdminSelectorFunction()
        }
    } else {
        mainSelector()
    }
})

program.parse()