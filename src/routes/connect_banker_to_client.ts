import express from "express"
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";
import { AppDataSource } from "../index";

const router = express.Router()

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
    const { clientId, bankerId } = req.params

    const client = await AppDataSource.manager.findOneBy(Client, { id: clientId });
    const banker = await AppDataSource.manager.findOneBy(Banker, { id: bankerId });

    if (!banker || !client) {
        return res.json({
            msg: "Banker or client not found"
        })
    }

    banker.clients = [client]

    await banker.save();

    return res.json({
        msg: "Banker connected to client"
    })
})

export {
    router as connectBankertoClientRouter
}
