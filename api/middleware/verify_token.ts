import { Drash } from "drash";
import { validate } from "../../utils/jwt.ts";

export default class VerifyTokenMiddleware extends Drash.Http.Middleware {
  public async run() {
    const token = this.request.headers.get("Authorization");
  
    if (!token) {
      throw new Drash.Exceptions.HttpException(
        400,
        "Unauthorized"
      );
    }

    const isValid = await validate(token);

    if (!isValid) {
      throw new Drash.Exceptions.HttpMiddlewareException(
        400,
        "Token is invalid"
      );
    }
  }
}