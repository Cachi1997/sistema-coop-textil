import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import colors from "colors";
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
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
    //logging: false,
    models: [__dirname + "/../models/**/*.ts"],
  }
);

export default db;
