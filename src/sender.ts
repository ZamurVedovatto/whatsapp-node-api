import { create, Whatsapp, Message, SocketState } from "venom-bot"

class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    async sendText(to:string, body: string) {
        // 5531988382148@c.us
        // 553181061339@c.us
        console.log("TO", to)
        await this.client.sendText(to, body)
    }

    private initialize() {
        const qr = (base64Qrimg:string) => {}
        const status = (statusSession:string) => {
            //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
        }
        const start = async (client: Whatsapp) => {
            this.client = client
            await this.sendText("553188382148@c.us", "Olá, tudo bem?")
        }


        // create('ws-sender-dev', qr, status)
        create('ws-sender-dev')
            .then((client) => start(client))
            .catch((error) => console.log(error))
    }
}

export default Sender