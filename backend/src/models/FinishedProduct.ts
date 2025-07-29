import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Bale } from "./Bale";
import Batch from "./Batch";
import Order from "./Order";

@Table({ tableName: "finished_products", timestamps: true })
export class FinishedProduct extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare productCode: string;

  @ForeignKey(() => Batch)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare batchId: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare orderId: number;
}

export default FinishedProduct;
