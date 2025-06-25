import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Shipment from "./Shipment";

@Table({ tableName: "transports", timestamps: true })
export class Transport extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare direction: string;

  @HasMany(() => Shipment)
  declare shipments: Shipment[];
}

export default Transport;
