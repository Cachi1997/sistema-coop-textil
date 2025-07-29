import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "type_weights", timestamps: true })
export class TypeWeight extends Model {
  @Column({
    type: DataType.ENUM,
    values: ["hilado", "top"],
  })
  declare type: "hilado" | "top";

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare type_number: number;
}

export default TypeWeight;
