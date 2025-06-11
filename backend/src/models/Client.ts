import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "clients", timestamps: true })
export class Client extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;
}

export default Client;
