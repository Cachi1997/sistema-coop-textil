import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Weighing from "./Weighing";
import { FinishedProduct } from "./FinishedProdcut";

@Table({ tableName: "orders", timestamps: true })
export class Order extends Model {
  @Column({})
  @HasMany(() => Weighing)
  declare weighings: Weighing[];

  @HasMany(() => FinishedProduct)
  declare finishedProducts: FinishedProduct[];
}

export default Order;
