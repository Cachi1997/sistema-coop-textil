import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Order from "./Order";

@Table({ tableName: "raw_materials", timestamps: true })
export class RawMaterial extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Order)
  declare orders: Order[];
}

export default RawMaterial;
