import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Bale } from "./Bale";

@Table({ tableName: "finished_products", timestamps: true })
export class FinishedProduct extends Model {}

export default FinishedProduct;
