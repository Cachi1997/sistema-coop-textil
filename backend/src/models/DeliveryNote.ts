import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Client from "./Client";
import Section from "./Section";

//Remitos
@Table({ tableName: "delivery_notes", timestamps: true })
export class DeliveryNote extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare truck: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  declare weight: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  declare usedWeight: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  declare remainingWeight: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare sale: boolean;

  //Remito
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare deliveryNoteNumber: number;

  //Remito hilanderia
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare spinningDeliveryNoteNumber: number;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare clientId: number;

  @BelongsTo(() => Client)
  declare client: Client;

  @ForeignKey(() => Section)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare sectionId: number;

  @BelongsTo(() => Section)
  declare section: Section;
}

export default DeliveryNote;
