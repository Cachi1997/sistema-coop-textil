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
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  declare code: string;
  @Column({
    type: DataType.ENUM("balance", "normal"),
    allowNull: false,
  })
  declare type: "balance" | "normal";
}

export default ActivationCodes;
