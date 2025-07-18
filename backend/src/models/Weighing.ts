import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import Order from "./Order";
import TypeWeight from "./TypeWeight";

@Table({ tableName: "weighings", timestamps: true })
export class Weighing extends Model {
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  })
  declare date: Date;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    validate: {
      is: /^\d{2}:\d{2}(:\d{2})?$/, // validación manual, Sequelize no tiene isTime
    },
  })
  declare time: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
    },
  })
  declare grossWeight: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
    },
  })
  declare netWeight: number;

  //Lote
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare batch: string;

  //Fardo
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare bale: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare internalTare: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare externalTare: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare notes: string;

  @ForeignKey(() => TypeWeight)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare typeWeightId: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare orderId: number;

  @BelongsTo(() => Order)
  declare order: Order;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}

export default Weighing;
