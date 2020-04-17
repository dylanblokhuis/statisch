import Drash from "drash";

import { gitModel } from "../models/mod.ts"
import validator from '../utils/validator.ts'

class Index extends Drash.Http.Resource {
  static paths = ["/git"];
  
  public async GET() {  
    const git = await gitModel.findById(1);
    if (git?.client_id !== null) {
      throw new Drash.Exceptions.HttpException(
        404,
        `A client has not been registered`
      );
    }

    this.response.body = git;
    return this.response;
  }

  public async POST() {
    const data = validator({
      client_id: 'required|string',
      client_secret: 'required|string',
      git_provider_id: 'required|number'
    }, this.request);

    await gitModel.insert(data)
  }
}

class Callback extends Drash.Http.Resource {
  static paths = ["/git/callback"];
  
  public async GET() {  
    const oauthCode = this.request.getPathParam("code");

    return this.response;
  }
}

export default [
  Index, Callback
]