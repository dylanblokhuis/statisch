import Drash from "drash";
import { Where } from 'dso';

import domain from '../models/domain.ts'
import validator from '../utils/validator.ts'
import Task from "../sbin/task.ts";

const { env } = Deno

function getRoot(name: string) {
  return `${env().DOCUMENT_ROOT}/${name}`
}

function getDocumentRoot(name: string) {
  return `${env().DOCUMENT_ROOT}/${name}/html`; 
}

function getVhostRoot(name: string) {
  return `${env().NGINX_PATH}/sites-available/${name}`
}

class Index extends Drash.Http.Resource {
  static paths = ["/domains"];
  
  public async GET() {  
    this.response.body = await domain.findAll({});
    return this.response;
  }

  public async POST() {
    const data = validator({
      name: 'required|string',
      build_command: 'required|string',
      directory_name: 'required|string'
    }, this.request);

    const root = getRoot(data.name)
    const documentRoot = getDocumentRoot(data.name)
    const vhostRoot = getVhostRoot(data.name)

    const domainTask = new Task([
      "sudo", "bash", "./sbin/domains/new.sh",
      documentRoot,
      vhostRoot,
      env().NGINX_PATH,
      data.name
    ]);

    const isSuccess = await domainTask.run()

    if (isSuccess) {
      await domain.insert({
        name: data.name,
        www: documentRoot,
        vhost: vhostRoot,
        root: root,
        directory_name: data.directory_name,
        build_command: data.build_command
      })  
    } else {
      throw new Drash.Exceptions.HttpException(
        500,
        `Task failed with cmd: ${domainTask.getArgs().cmd.join(" ")}`
      );
    }

    this.response.body = "Successfully added domain"
    
    return this.response
  }
}

class Single extends Drash.Http.Resource {
  static paths = ["/domains/:id"];

  public async GET() {
    const domainId = this.request.getPathParam("id");
    this.response.body = await domain.findById(domainId)
    return this.response;
  }

  public async DELETE() {
    const domainId = this.request.getPathParam("id");
    const data = await domain.findById(domainId);
    
    // TODO: fix the not null issues
    if (!data || !data.root || !data.www || !data.vhost || !data.name) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Domain doesnt exist`
      );
    } 

    const domainTask = new Task([
      "sudo", "bash", "./sbin/domains/delete.sh",
      data.root,
      data.vhost,
      env().NGINX_PATH,
      data.name
    ]);

    const isSuccess = await domainTask.run()

    if (isSuccess) {
      await domain.delete(Where.field("id").eq(data.id))
    } else {
      throw new Drash.Exceptions.HttpException(
        500,
        `Task failed with cmd: ${domainTask.getArgs().cmd.join(" ")}`
      );
    }

    this.response.body = "Successfully deleted domain"
  
    return this.response;
  }
}

export default [
  Index, Single
]