import express from "express"
import { Client } from "../entities/Client";
import { AppDataSource } from "../index";

const router = express.Router()

router.delete("/api/client/:clientId", async (req, res) => {
    const { clientId } = req.params;

    const response = await AppDataSource.manager.delete(Client, { id: clientId })

    return res.json(response)
})

export { router as deleteClientRouter }