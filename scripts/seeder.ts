import { gitProviderModel } from '../models/mod.ts'

export default async function seeder() {  
  await gitProviderModel.insert({
    name: "GitHub"
  })
}