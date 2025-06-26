import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Weighing from "./Weighing";
import { FinishedProduct } from "./FinishedProduct";

@Table({ tableName: "orders", timestamps: true })
export class Order extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare orderNumber: string;

  @HasMany(() => Weighing)
  declare weighings: Weighing[];

  @HasMany(() => FinishedProduct)
  declare finishedProducts: FinishedProduct[];
}

export default Order;
