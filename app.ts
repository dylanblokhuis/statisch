import { dso } from "dso";
import Drash from "drash";
import * as models from "./models/mod.ts";
import resources from "./api/mod.ts";

async function database() {
  await models

  await dso.connect({
    hostname: "127.0.0.1",
    username: "root",
    db: "statisch",
    password: "hoi123",
    port: 3306
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