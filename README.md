
# Francium Project

A simple and self-hostable open source link shortener and collector written in NextJS

## Features
- 📱 Simple and elegant user interface
- 🪬 Built-in Url filter
- 🔎 Link checker and reporter
- 📈 Ackee Analytics support
... and much more!
## Tech Stack

**Front-end**: TailwindCSS, shadCn UI

**Back-end**: NextJS 14, Bun


## Environment Variables

To run this project, you have to have an .env file like tthe one below.
```bash
## Database
DATABASE_URL="file:./dev.db"  

## NextAuth  
NEXTAUTH_SECRET=<secret_you_generate>
NEXTAUTH_URL=<domain_of_your_application>
AdminMail=<your_email>

# Discord  
DISCORD_CLIENT_SECRET=
DISCORD_CLIENT_ID=

# Github  
GITHUB_CLIENT_SECRET=  
GITHUB_CLIENT_ID=

# Google  
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
```
- You need to specify your email address on this file to mark yourself as owner. Otherwise you won't be able to access the dashboard of this application.
- You need to generate an secret for Nextauth to generate session tokens, you can get one by using the `openssl rand -base64 32` command.
- You also need to specify the domain of application, otherwise you could have problems with auth providers.

You can get your client id and secrets from links below:
- [Discord](https://discord.com/developers/applications)
- [Google](https://console.developers.google.com/apis/credentials)
- [Github](https://github.com/settings/apps)

If you've disabled an auth provider inside the config file, you can ignore it.
## Installation

Installation of francium is only a 2 step progress and anyone with so little experience with a terminal can get it done!

### 1-) Config file
- francium uses a config file named `siteconfig.json` that looks like the below.
```json
    {
    "SiteName": "Francium Project",
    "SiteDescription": "",
    "SiteUrl": "localhost:8085",
    "Ackee" : {
        "useAckee": false,
        "AckeeUrl": "",
        "AckeeDomainId": ""
    },
    "HomePage": {
        "homeHeader": "Vexxit Link Shortener",
        "EnableHomePageContent": true,
        "Accordions": [
            {
                "title": "Accordion 1",
                "description": "Accordion 1 test"
            },
            {
                "title": "Accordion 2",
                "description": "Accordion 2 test"
            },
            {
                "title": "Accordion 3",
                "description": "Accordion 3 test"
            }
        ],
        "BlockItems": [

        ]
    },
    "Auth": {
        "EnableGithubAuth": true,
        "EnableGoogleAuth": true,
        "EnableDiscordAuth": true
    }
}
```
- You can change various aspects of application, such as disabling login options, enabling or disabling the homepage and etc. A detailed documentation will be made soon.

### 2-) Installation
- Running this application requires the [Bun](https://bun.sh). You can install it on your system using `curl -fsSL https://bun.sh/install | bash` command.

- If you already have Bun, clone this repo and run the commands below.
```bash
bun install # Install the depencies
bunx prisma migrate dev # Migrate the database schema to SQLite
bun run build && bun run start # Build and run the application
```
- After that your application should be up and running under `http://localhost:8085`!