import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Shipment from "./Shipment";

@Table({ tableName: "deliver_ins", timestamps: true })
export class DeliverIn extends Model {
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare direction: string;

  @HasMany(() => Shipment)
  declare shipments: Shipment[];
}

export default DeliverIn;
