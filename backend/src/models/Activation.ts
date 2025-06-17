// src/models/CodigoActivacion.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from "sequelize-typescript";

@Table({ tableName: "activation_codes", timestamps: true })
export class ActivationCodes extends Model {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 10],
    },
  })
  declare code: string;
  @Column({
    type: DataType.ENUM("balance", "normal"),
    allowNull: false,
  })
  declare type: "balance" | "normal";
}

export default ActivationCodes;
