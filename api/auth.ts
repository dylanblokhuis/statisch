import { Drash } from "drash";
import { Where } from "dso";
import { hash, verify } from "https://deno.land/x/argon2/lib/mod.ts";

import { generate, validate } from '../utils/jwt.ts'
import { userModel } from "../models/mod.ts";
import validator from '../utils/validator.ts'

class Login extends Drash.Http.Resource {
  static paths = ["/login"];

  public async POST() {
    const data = validator({
      email: 'required|string',
      password: 'required|string',
    }, this.request);

    const user = await userModel.findOne({
      where: Where.field("email").eq(data.email)
    });

    if (!user || !user.password || !user.email) {
      throw new Drash.Exceptions.HttpException(
        400,
        `No user matches that email`
      );
    }

    if (!await verify(user.password, data.password)) {
      // TODO: show a better message to give malicious users less of a clue
      throw new Drash.Exceptions.HttpException(
        400,
        `Incorrect password`
      );
    }

    const token = await generate(user.email)

    delete user.password

    this.response.body = {
      user: user,
      token: token
    };
    return this.response;
  }
}

class Register extends Drash.Http.Resource {
  static paths = ["/register"];

  public async POST() {
    const data = validator({
      name: 'required|string',
      email: 'required|email',
      password: 'required|string',
    }, this.request);


    const user = await userModel.findOne({
      where: Where.field("email").eq(data.email)
    });

    if (user && user.email) {
      throw new Drash.Exceptions.HttpException(
        400,
        `User with this email already exists`
      );
    }

    const userId = await userModel.insert({
      name: data.name,
      email: data.email,
      password: await hash(data.password)
    })

    if (!userId) {
      throw new Drash.Exceptions.HttpException(
        500,
        `Couldn't register user`
      );
    }

    this.response.body = "you registered!!"

    return this.response;
  }
}

class Me extends Drash.Http.Resource {
  static paths = ["/me"];

  public async GET() {
    const token = this.request.headers.get("Authorization");
    const isValid = await validate(token);

    if (isValid === null) {
      throw new Drash.Exceptions.HttpException(
        400,
        `Unauthorized`
      );
    }

    const user = await userModel.findOne({
      where: Where.field("email").eq(isValid.payload.iss)
    })

    if (!user) {
      throw new Drash.Exceptions.HttpException(
        400,
        `Jwt payload is invalid`
      );
    }

    delete user.password

    this.response.body = user
    return this.response;
  }
}

export default [
  Login,
  Register,
  Me
]
