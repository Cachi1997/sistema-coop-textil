import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "products", timestamps: true })
export class Product extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;
}

export default Product;
