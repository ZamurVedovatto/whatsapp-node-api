import { create, Whatsapp, Message, SocketState } from "venom-bot"
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js'

export type QRCode = {
    // base64Qrimg
    base64Qr: string,
    attempts: number,
}

class Sender {
    private client: Whatsapp
    private connected: boolean
    private qr: QRCode

    get isConnected():boolean {
        return this.connected
    }
    get qrCode():QRCode {
        return this.qr
    }

    constructor() {
        this.initialize()
    }

    async sendText(to:string, body: string) {
        // 553188382148@c.us
        if(!isValidPhoneNumber(to, "BR")) {
            throw new Error('this number is not valid')
        }
        let phoneNumber = parsePhoneNumber(to, "BR")?.format("E.164").replace("+", "") as string
        console.log("phoneNumber befoe checking", phoneNumber)
        phoneNumber = phoneNumber?.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`
        console.log("phoneNumber", phoneNumber)
        await this.client.sendText(phoneNumber, body)
    }

    private initialize() {
        const qr = (base64Qr:string, attempts: number) => {
            this.qr = { base64Qr, attempts }
        }
        const status = (statusSession:string) => {
            //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(
                statusSession
            )
        }
        const start = async (client: Whatsapp) => {
            this.client = client
            // await this.sendText("553188382148@c.us", "Olá, tudo bem?")

            client.onStateChange((state) => {
                this.connected = state == SocketState.CONNECTED
            })
        }


        // create('ws-sender-dev', qr, status)
        create('ws-sender-dev')
            .then((client) => start(client))
            .catch((error) => console.log(error))
    }
}

export default Sender