import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";

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
  declare weight: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare notes: string;

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
