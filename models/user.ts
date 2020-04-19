import {
  BaseModel,
  dso,
  Field,
  FieldType,
  Model,
} from "dso";

@Model("users")
class UserModel extends BaseModel {
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
  email: string;

  @Field({ type: FieldType.STRING, length: 255, notNull: true })
  password: string
  
  @Field({ type: FieldType.BOOLEAN, default: false })
  administrator: boolean;
}

export default dso.define(UserModel);