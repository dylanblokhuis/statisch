import {
  BaseModel,
  dso,
  Field,
  FieldType,
  Join,
  Model,
  Where
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

  @Field({ type: FieldType.STRING, length: 30, notNull: true })
  password: string;
}

export default dso.define(DomainModel);
