import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import FinishedProduct from "./FinishedProduct";

// Tabla de lotes
@Table({ tableName: "batches", timestamps: true })
export class Batch extends Model {
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  declare batchNumber: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isYarn: boolean;

  @HasMany(() => FinishedProduct)
  declare finishedProducts: FinishedProduct[];
}

export default Batch;
