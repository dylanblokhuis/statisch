import Drash from "drash";
import domain from '../models/domain.ts'
import validator from '../utils/validator.ts'
import Task from "../sbin/task.ts";

class Index extends Drash.Http.Resource {
  static paths = ["/domains"];
  
  public async GET() {  
    this.response.body = await domain.findAll({});
    return this.response;
  }

  public async POST() {
    const data = validator({
      name: 'required|string',
    }, this.request);

    const documentRoot = `/var/www/${data.name}/html`;
    const vhostRoot = `/etc/nginx/sites-available/${data.name}`

    const domainTask = new Task([
      "sudo", "bash", "./sbin/new_domain.sh",
      documentRoot,
      vhostRoot,
      data.name
    ]);

    const isSuccess = await domainTask.run()

    if (isSuccess) {
      await domain.insert({
        name: data.name,
        www: documentRoot,
        vhost: vhostRoot,
      })  
    } else {
      throw new Drash.Exceptions.HttpException(
        500,
        `Task failed with cmd: ${domainTask.getArgs().cmd.join(" ")}`
      );
    }
    
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
}

export default [
  Index, Single
]