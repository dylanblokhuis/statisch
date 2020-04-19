import {
  BaseModel,
  dso,
  Field,
  FieldType,
  Model,
} from "dso";

@Model("git_tokens")
class GitTokensModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true
  })
  id: number;

  @Field({ type: FieldType.STRING, length: 255, notNull: true })
  access_token: string

  @Field({ type: FieldType.INT, length: 11, notNull: true })
  git_id: number
}

export default dso.define(GitTokensModel);