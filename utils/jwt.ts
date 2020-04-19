import makeJwt, {
  setExpiration,
  Jose,
  Payload
} from "https://deno.land/x/djwt/create.ts"
import validateJwt from "https://deno.land/x/djwt/validate.ts"
// import { hash } from "https://deno.land/x/argon2/lib/mod.ts";

const { env } = Deno

export interface Jwt {
  header: Jose
  payload: Payload,
  signature: string
}

export async function generate(email: string) : Promise<string> {
  const key = env().JWT_SECRET
  const payload: Payload = {
    iss: email, // TODO: research this
    exp: setExpiration(new Date().getTime() + 604800000), // number equals to a week
  }
  const header: Jose = {
    alg: "HS256",
    typ: "JWT",
  }

  return makeJwt({ header, payload }, key)
}

export async function validate(token: string) : Promise<Jwt | null> {
  //@ts-ignore
  return await validateJwt(token, env().JWT_SECRET, false)
}
