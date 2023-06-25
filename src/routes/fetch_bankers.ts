import express from "express"
import { AppDataSource } from "../index";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.get("/api/bankers", async (req, res) => {
    const bankers = await AppDataSource.manager
        .createQueryBuilder(Banker, "banker")
        .select("banker.first_name")
        .addSelect("banker.last_name")
        .getMany()

    return res.json(bankers);
})

router.get("/api/bankers/:bankerId", async (req, res) => {
    const { bankerId } = req.params;

    const banker = await AppDataSource.manager
        .createQueryBuilder(Banker, "banker")
        .where("banker.id = :bankerId", { bankerId })
        .getOne()

    return res.json(banker);
})

export { router as fetchBankersRouter }

