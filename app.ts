import "https://deno.land/x/dotenv/load.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";
import { dso } from "dso";
import { Drash } from "drash";

import * as models from "./models/mod.ts";
import resources from "./api/mod.ts";
import seeder from './scripts/seeder.ts';
import VerifyTokenMiddleware from "./api/middleware/verify_token.ts";

const { env, args } = Deno
const runArgs = parse(args);

async function database() {
  await models

  await dso.connect({
    hostname: env().DATABASE_HOST,
    username: env().DATABASE_USER,
    db: env().DATABASE_NAME,
    password: env().DATABASE_PASSWORD,
    port: parseInt(env().DATABASE_PORT)
  });

  await dso.sync(false)
}

function server() {
  const server = new Drash.Http.Server({
    address: "localhost:8000",
    response_output: "application/json",
    resources: resources,
    middleware: {
      resource_level: [
        VerifyTokenMiddleware
      ]
    }
  });

  server.run();
}

await database()
await server()

if (runArgs?.seed) {
  // clean database
  await dso.sync(true)
  await seeder()
}
