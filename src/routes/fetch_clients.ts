import express from "express"
import { AppDataSource } from "../index";
import { Client } from "../entities/Client";

const router = express.Router();

router.get("/api/clients", async (req, res) => {
    const clients = await AppDataSource.manager
        .createQueryBuilder(Client, "client")
        .select("client.first_name")
        .addSelect("client.last_name")
        .leftJoinAndSelect(
            "client.transactions",
            "transactions"
        )
        .getMany()

    return res.json(clients);
})

router.get("/api/clients/:clientId", async (req, res) => {
    const { clientId } = req.params;

    const client = await AppDataSource.manager
        .createQueryBuilder(Client, "client")
        .where("client.id = :clientId", { clientId })
        .getOne()

    return res.json(client);
})

export { router as fetchClientsRouter }

