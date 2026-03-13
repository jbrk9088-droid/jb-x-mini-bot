const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys")
const pino = require("pino")

async function startBot(){

const { state, saveCreds } = await useMultiFileAuthState("session")

const sock = makeWASocket({
logger: pino({ level: "silent" }),
auth: state,
printQRInTerminal: false
})

sock.ev.on("connection.update", async (update) => {

const { connection } = update

if(connection === "open"){

const number = "584169861331"

const code = await sock.requestPairingCode(number)

console.log("PAIR CODE:", code)

}

sock.ev.on("creds.update", saveCreds)

sock.ev.on("messages.upsert", async ({ messages }) => {

const m = messages[0]
if (!m.message) return

const msg = m.message.conversation || m.message.extendedTextMessage?.text

if (msg === ".menu") {

await sock.sendMessage(m.key.remoteJid, {
image: { url: "./menu.jpg" },
caption: `
☠️ *JB X MINI BOT*

Owner: ${config.ownername}

╭───「 MENU 」
│ .menu
│ .owner
│ .ping
│ .song
│ .play
│ .ytmp3
│ .ytmp4
│ .antilink
│ .tagall
│ .kick
│ .add
│ .promote
│ .demote
│ .sticker
│ .ai
│ .alive
╰──────────

Telegram:
${config.telegram}

Channel:
${config.channel}
`
})

}

})

}

startBot()
