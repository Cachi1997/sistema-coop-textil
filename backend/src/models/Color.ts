import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import Order from "./Order";

@Table({ tableName: "colors", timestamps: true })
export class Color extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    autoIncrement: false,
    allowNull: false,
  })
  declare idColor: string;
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @HasMany(() => Order)
  declare orders: Order[];
}

export default Color;
