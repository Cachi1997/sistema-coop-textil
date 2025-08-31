import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import colors from "colors";
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 5000, // timeout de conexión: 5s
      idle: 10000,
    },
    logging: (msg) => {
      if (msg.includes("SELECT")) {
        console.log(colors.cyan(msg)); // SELECT -> Cyan
      } else if (msg.includes("INSERT")) {
        console.log(colors.green(msg)); // INSERT -> Verde
      } else if (msg.includes("UPDATE")) {
        console.log(colors.yellow(msg)); // UPDATE -> Amarillo
      } else if (msg.includes("DELETE")) {
        console.log(colors.red(msg)); // DELETE -> Rojo
      } else {
        console.log(colors.gray(msg)); // Otros -> Gris
      }
    },
    models: [__dirname + "/../models/**/*.ts"],
  }
);

export default db;
