import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import FinishedProduct from "./FinishedProduct";

//Tabla de fardos
@Table({ tableName: "bales", timestamps: true })
export class Bale extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare batchNumber: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare ppe: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare weight: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare baleNumber: number;
}

export default Bale;
