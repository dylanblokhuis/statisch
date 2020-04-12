import "https://deno.land/x/dotenv/load.ts";
import { dso } from "dso";
import Drash from "drash";
import * as models from "./models/mod.ts";
import resources from "./api/mod.ts";

const { env } = Deno

async function database() {
  await models

  await dso.connect({
    hostname: env().DATABASE_HOST,
    username: env().DATABASE_USER,
    db: env().DATABASE_NAME,
    password: env().DATABASE_PASSWORD,
    port: parseInt(env().DATABASE_PORT)
  });

  // await dso.sync(true)
}

function server() {
  const server = new Drash.Http.Server({
    address: "localhost:8000",
    response_output: "application/json",
    resources: resources
  });
  
  server.run();
}

await database()
await server()