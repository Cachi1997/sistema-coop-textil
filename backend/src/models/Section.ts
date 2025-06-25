import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import DeliveryNote from "./DeliveryNote";

@Table({ tableName: "sections", timestamps: true })
export class Section extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  declare name: string;

  @HasMany(() => DeliveryNote)
  declare deliveryNotes: DeliveryNote[];
}

export default Section;
