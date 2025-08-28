import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from "sequelize-typescript";

@Table({ tableName: "users", timestamps: true })
export class User extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare lastName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  declare dni: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare code: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare isActive: boolean;
}

export default User;
