import express from 'express'
import axios from 'axios'
import * as config from '../config.json'
export default () => {
    const api = express.Router()
    api.use(express.json())
    api.post("/webhook", async (req, res) => {
        const url = req.body.hostname
        const timestamp = req.body.timestamp

        let webhook = ""
        for (const configItem of config.mapping) {
            if (configItem.url === url) {
                webhook = configItem.webhook
            }
        }

        if (webhook === "") {
            return res.status(400).send("invalid error url")
        }
        await axios.post(webhook, {
            "text": `Failure detected at ${url} at time ${timestamp}.`
        })
        res.status(200).send('success')
    })
    return api
}