import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Weighing from "./Weighing";
import { FinishedProduct } from "./FinishedProduct";
import Client from "./Client";
import Color from "./Color";
import Product from "./Product";
import Tone from "./Tone";
import { Denier } from "./Denier";
import RawMaterial from "./RawMaterial";

@Table({ tableName: "orders", timestamps: true })
export class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ppe: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare orderNumber: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare kilos: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare batchNumber: number; //Partida

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare cicle: number; //Ciclo

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  declare endDate: Date; //FBaja

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare lastKG: number; //KGUltimos

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare observation: string; //Observacion

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isCanceled: boolean; //Anulado

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare idPrinted: boolean; //Impreso

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare firstTruck: string; //Camion1

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare secondTruck: string; //Camion2

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare processedKilos: number; //KilosPasados

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare productId: number;

  @BelongsTo(() => Product)
  declare product: Product;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare clientId: number;

  @BelongsTo(() => Client)
  declare client: Client;

  @ForeignKey(() => Color)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare colorId: string;

  @BelongsTo(() => Color)
  declare color: Color;

  @ForeignKey(() => Denier)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare denierId: number;

  @BelongsTo(() => Denier)
  declare denier: Denier;

  @ForeignKey(() => Tone)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare toneId: string; //Tono

  @BelongsTo(() => Tone)
  declare tone: Tone;

  @ForeignKey(() => RawMaterial)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare rawMaterialId: number;

  @BelongsTo(() => RawMaterial)
  declare rawMaterial: RawMaterial;

  @HasMany(() => Weighing)
  declare weighings: Weighing[];

  @HasMany(() => FinishedProduct)
  declare finishedProducts: FinishedProduct[];
}

export default Order;
