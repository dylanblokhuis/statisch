import {
  BaseModel,
  dso,
  Field,
  FieldType,
  Model,
} from "dso";

@Model("domains")
class DomainModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true
  })
  id: number;

  @Field({ type: FieldType.STRING, length: 255, notNull: true })
  name: string;

  @Field({ type: FieldType.STRING, length: 255, notNull: true })
  vhost: string;

  @Field({ type: FieldType.STRING, length: 255, notNull: true })
  www: string

  @Field({ type: FieldType.INT, length: 11, notNull: false, default: 0 })
  parent_id: number
}

export default dso.define(DomainModel);
