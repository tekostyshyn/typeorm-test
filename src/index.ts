import { DataSource } from "typeorm"
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import express from "express";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankertoClientRouter } from "./routes/connect_banker_to_client";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchBankersRouter } from "./routes/fetch_bankers";
import { fetchClientsRouter } from "./routes/fetch_clients";
require("dotenv").config()
const { HOST, PORT, USERNAME, PASSWORD } = process.env;

const app = express()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOST,
    port: Number(PORT),
    username: USERNAME,
    password: PASSWORD,
    database: "typeorm",
    entities: [
        Client, Banker, Transaction
    ],
    synchronize: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.use(express.json())

        app.use(createClientRouter)
        app.use(createBankerRouter)
        app.use(createTransactionRouter)
        app.use(connectBankertoClientRouter)
        app.use(deleteClientRouter)
        app.use(fetchBankersRouter)
        app.use(fetchClientsRouter)

        app.listen(8080, () => {
            console.log("Now running on port 8080");
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })