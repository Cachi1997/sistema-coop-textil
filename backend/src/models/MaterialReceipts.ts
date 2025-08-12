import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Color from "./Color";
import Client from "./Client";
import RawMaterial from "./RawMaterial";

@Table({ tableName: "material_receipt", timestamps: true })
export class MaterialReceipt extends Model {
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare entryDate: Date;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare truck: string;

  //Lote
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare batch: string;

  //Fardo
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare baleNumber;

  @Column({
    type: DataType.DECIMAL(20, 2),
    allowNull: true,
  })
  declare baleKilos: number;

  //batchNumber
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare batchNumber: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare colorName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare product: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare denier: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare totalDenier: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare luster: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare merge: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare deliveryNoteNumber: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare dispatched: boolean; //Remitido

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
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare colorId: number;

  @BelongsTo(() => Color)
  declare color: Color;

  @ForeignKey(() => RawMaterial)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare rawMaterialId: number;

  @BelongsTo(() => RawMaterial)
  declare rawMaterial: RawMaterial;
}

export default MaterialReceipt;
