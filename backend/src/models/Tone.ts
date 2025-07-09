import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Order from "./Order";

@Table({ tableName: "tones", timestamps: true })
export class Tone extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare description: string;

  @HasMany(() => Order)
  declare orders: Order[];
}

export default Tone;
