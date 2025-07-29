import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Order from "./Order";
import Client from "./Client";

@Table({ tableName: "colors", timestamps: true })
export class Color extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare idColor: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare colorName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare originalColorName: string;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare clientId: number;

  @BelongsTo(() => Client)
  declare client: Client;

  @HasMany(() => Order)
  declare orders: Order[];
}

export default Color;
