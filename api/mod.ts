import { Drash } from "drash";

import DomainResource from './domain.ts'
import GitResource from './git.ts'
import UserResource from './user.ts'
import AuthResource from './auth.ts'

class Home extends Drash.Http.Resource {
  static paths = ["/"]

  public async GET() {
    this.response.body = "Statisch API"
    return this.response;
  }
}

export default [
  Home,
  ...DomainResource,
  ...GitResource,
  ...UserResource,
  ...AuthResource
]