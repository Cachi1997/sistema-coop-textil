import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Shipment from "./Shipment";

@Table({ tableName: "drivers", timestamps: true })
export class Driver extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare fullName: string;

  @HasMany(() => Shipment)
  declare shipments: Shipment[];
}

export default Driver;
