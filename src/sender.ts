import { create, Whatsapp, Message, SocketState } from "venom-bot"

class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    private initialize() {
        const qr = (base64Qrimg:string) => {}
        const status = (statusSession:string) => {
            //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
        }
        const start = (client: Whatsapp) => {
            this.client = client
        }


        // create('ws-sender-dev', qr, status)
        create('ws-sender-dev')
            .then((client) => start(client))
            .catch((error) => console.log(error))
    }
}

export default Sender