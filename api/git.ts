import Drash from "drash";

import { gitModel, gitProviderModel, gitTokensModel } from "../models/mod.ts"
import validator from '../utils/validator.ts'

class GitIndex extends Drash.Http.Resource {
  static paths = ["/git"];
  
  public async GET() {  
    const git = await gitModel.findById(1);
    if (git?.client_id !== null) {
      throw new Drash.Exceptions.HttpException(
        400,
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

class GitCallback extends Drash.Http.Resource {
  static paths = ["/git/callback"];
  
  public async GET() {  
    // TODO: add access token to database
    // makes more sense to build the frontend first and then figure this out

    //https://github.com/login/oauth/access_token
    const oauthCode = this.request.getPathParam("code");
    const git = await gitModel.findById(1);

    if (!git || !git.id || !git.client_id || !git.client_secret) {
      throw new Drash.Exceptions.HttpException(
        500,
        `Couldn't find client`
      );
    }

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: git.client_id,
        client_secret: git.client_secret,
        code: oauthCode
      })
    })

    if (response.ok) {
      const data = await response.text();
      
      const id = await gitTokensModel.insert({
        access_token: data,
        git_id: git.id
      })

      this.response.body = {
        id: id
      }
    } else {
      throw new Drash.Exceptions.HttpException(
        500,
        `Something went wrong on retrieving the access token`
      );
    }

    return this.response;
  }
}

class GitProviders extends Drash.Http.Resource {
  static paths = ["/git/providers"];
  
  public async GET() {  
    this.response.body = await gitProviderModel.findAll({})

    return this.response;
  }
}

// probably redudant
class GitTokens extends Drash.Http.Resource {
  static paths = ["/git/tokens/:id"];

  public async GET() {  
    const id = this.request.getPathParam("id")
    this.response.body = await gitTokensModel.findById(id);

    return this.response;
  }
}

export default [
  GitIndex, GitCallback, GitProviders, GitTokens
]