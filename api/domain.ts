import Drash from "drash";
import domain from '../models/domain.ts'

class Index extends Drash.Http.Resource {
  static paths = ["/domains"];
  
  public async GET() {  
    this.response.body = await domain.findAll({});
    return this.response;
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