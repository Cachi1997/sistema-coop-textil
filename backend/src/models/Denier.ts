import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Order from "./Order";

@Table({ tableName: "deniers", timestamps: true })
export class Denier extends Model {
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  declare denier: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 20],
    },
  })
  declare key: string;

  @Column({
    type: DataType.FLOAT(10),
  })
  declare coefficient: number;

  @HasMany(() => Order)
  declare orders: Order[];
}
