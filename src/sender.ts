import { create, Whatsapp, Message, SocketState } from "venom-bot"
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js'

class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    async sendText(to:string, body: string) {
        // 553188382148@c.us
        if(!isValidPhoneNumber(to, "BR")) {
            throw new Error('this number is not valid')
        }
        let phoneNumber = parsePhoneNumber(to, "BR")?.format("E.164").replace("+", "") as string
        phoneNumber = phoneNumber?.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`
        console.log("phoneNumber", phoneNumber)
        await this.client.sendText(phoneNumber, body)
    }

    private initialize() {
        const qr = (base64Qrimg:string) => {}
        const status = (statusSession:string) => {
            //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
        }
        const start = async (client: Whatsapp) => {
            this.client = client
            // await this.sendText("553188382148@c.us", "Olá, tudo bem?")
        }


        // create('ws-sender-dev', qr, status)
        create('ws-sender-dev')
            .then((client) => start(client))
            .catch((error) => console.log(error))
    }
}

export default Sender