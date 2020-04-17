import {
  BaseModel,
  dso,
  Field,
  FieldType,
  Model,
} from "dso";

@Model("git")
class GitModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true
  })
  id: number;

  @Field({ type: FieldType.STRING, length: 255, notNull: true, primary: true })
  client_id: string;
  
  @Field({ type: FieldType.STRING, length: 255, notNull: true, primary: true })
  client_secret: string;
  
  @Field({ type: FieldType.INT, length: 11, notNull: true })
  git_provider_id: number;
}

export default dso.define(GitModel);