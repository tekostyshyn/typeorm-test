import { DataSource } from "typeorm"
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
require("dotenv").config()
const { HOST, PORT, USERNAME, PASSWORD } = process.env;

const AppDataSource = new DataSource({
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
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })