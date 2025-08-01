import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "ppe", timestamps: true })
export class PPE extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ppe: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare period: number;
}

export default PPE;
