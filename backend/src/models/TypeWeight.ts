import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "type_weights", timestamps: true })
export class TypeWeight extends Model {
  @Column({
    type: DataType.ENUM,
    values: ["hilado", "top"],
  })
  declare type: "hilado" | "top";

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare type_number: string;
}

export default TypeWeight;
