import {
  BaseModel,
  dso,
  Field,
  FieldType,
  Model,
} from "dso";

@Model("git_providers")
class GitProviderModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true
  })
  id: number;

  @Field({ type: FieldType.STRING, length: 255, notNull: true, primary: true })
  name: string
}

export default dso.define(GitProviderModel);