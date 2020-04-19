import { Drash } from "drash";

import { userModel } from "../models/mod.ts";

class UserIndex extends Drash.Http.Resource {
  static paths = ["/users"];

  static middleware = {
    before_request: [
      "VerifyTokenMiddleware"
    ],
  }

  public async GET() {
    const users = await userModel.findAll({});

    this.response.body = users;
    return this.response;
  }
}

export default [
  UserIndex
]
