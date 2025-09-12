import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import colors from "colors";
import ActivationCodes from "../models/Activation";
import Bale from "../models/Bale";
import Batch from "../models/Batch";
import Client from "../models/Client";
import Color from "../models/Color";
import DeliverIn from "../models/DeliverIn";
import DeliveryNote from "../models/DeliveryNote";
import { Denier } from "../models/Denier";
import Driver from "../models/Driver";
import FinishedProduct from "../models/FinishedProduct";
import MaterialReceipt from "../models/MaterialReceipts";
import Order from "../models/Order";
import PPE from "../models/PPE";
import Product from "../models/Product";
import RawMaterial from "../models/RawMaterial";
import Section from "../models/Section";
import Shipment from "../models/Shipment";
import Tone from "../models/Tone";
import Transport from "../models/Transport";
import TypeWeight from "../models/TypeWeight";
import User from "../models/User";
import Weighing from "../models/Weighing";
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
    models: [ActivationCodes, Bale, Batch, Client, Color, DeliverIn, DeliveryNote, Denier, Driver, FinishedProduct, MaterialReceipt, Order, PPE, Product, RawMaterial, Section, Shipment, Tone, Transport, TypeWeight, User, Weighing],
  }
);

export default db;
