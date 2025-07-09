import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import DeliveryNote from "./DeliveryNote";
import Shipment from "./Shipment";
import Order from "./Order";

@Table({ tableName: "clients", timestamps: true })
export class Client extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Order)
  declare orders: Order[];

  @HasMany(() => DeliveryNote)
  declare deliveryNotes: DeliveryNote[];

  @HasMany(() => Shipment)
  declare shipments: Shipment[];
}

export default Client;
