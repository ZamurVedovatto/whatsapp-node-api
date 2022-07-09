import express, { Request, Response } from "express"
import Sender from './sender'


const sender = new Sender()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (req: Request, res: Response) => {
    console.log("status")
    return res.send({
        qr_code: sender.qrCode,
        connected: sender.isConnected
    })
})

app.post("/send", async(req: Request, res: Response) => {
    // "553188382148@c.us"
    const { number, message } = req.body
    try {
        // number validation and transformation
        await sender.sendText(number, message)
        return res.status(200).json({
            message: "message sent"
        })
    } catch (error) {
        console.error("error", error)
        res.status(500).json({
            status: "error",
            message: error
        })
    }
})

app.listen(5000, () => {
    console.log("server is running on port 5000")
})