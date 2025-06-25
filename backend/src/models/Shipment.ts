import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Client from "./Client";
import Transport from "./Transport";
import DeliverIn from "./DeliverIn";
import Driver from "./Driver";

@Table({ tableName: "shipments", timestamps: true })
export class Shipment extends Model {
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: Date;

  //Remito
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare deliveryNote: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare truck: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare declaredValue: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare observation: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare cuit: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare condition: string;

  @ForeignKey(() => Transport)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare transportId: number;

  @BelongsTo(() => Transport)
  declare transport: Transport;

  @ForeignKey(() => DeliverIn)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare deliverInId: number;

  @BelongsTo(() => DeliverIn)
  declare deliverIn: DeliverIn;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare clientId: number;

  @BelongsTo(() => Client)
  declare client: Client;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare driverId: number;

  @BelongsTo(() => Driver)
  declare driver: Driver;
}

export default Shipment;
