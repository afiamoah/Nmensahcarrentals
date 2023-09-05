import mysql from 'mysql'
import { config } from "dotenv";
config()

export const connect=mysql.createConnection({
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    host:process.env.HOST,
    multipleStatements: true

})