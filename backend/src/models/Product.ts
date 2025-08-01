import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Order from "./Order";

@Table({ tableName: "products", timestamps: true })
export class Product extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Order)
  declare orders: Order[];
}

export default Product;
