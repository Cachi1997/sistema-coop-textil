import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({ tableName: "colors", timestamps: true })
export class Color extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: false,
    allowNull: false,
  })
  declare idColor: number;
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
  })
  declare name: string;
}

export default Color;
