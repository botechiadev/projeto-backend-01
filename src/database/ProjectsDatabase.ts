import { IProjectDB } from '../interfaces/interfaces';
import {BaseDatabase} from './BaseDatabase'

export class ProjectsDatabase extends BaseDatabase{
 public static TABLE_PROJECTS = "projects"
 
 async findProjects(q:string|undefined):Promise<IProjectDB[]|undefined[]>{


  if(!q){
    const result: IProjectDB[] = await BaseDatabase.connection(ProjectsDatabase.TABLE_PROJECTS)
    const ProjectsDB = result;

  return ProjectsDB
} else{
  const result = await BaseDatabase.connection(ProjectsDatabase.TABLE_PROJECTS).
  where( "projectName","LIKE", `%${q}%`)
    const ProjectsDB = result;

  return ProjectsDB
}
 }



async findProjectsById(id:string):Promise<IProjectDB[]|undefined[]>{

  const result = await BaseDatabase.connection(ProjectsDatabase.TABLE_PROJECTS).
  where( "id","LIKE", `%${id}%`)

    const ProjectsDB = result
  return ProjectsDB
}


async findProjectsId(id:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT id FROM ${ProjectsDatabase.TABLE_PROJECTS} WHERE id LIKE ${id}`)
 

    const ProjectsId = result
  return ProjectsId
}


async insertProject (Projects4Insert: IProjectDB):Promise<void>{
await BaseDatabase.connection(ProjectsDatabase.TABLE_PROJECTS).insert(Projects4Insert)
  
}

async updateProjects (Projects4Update: IProjectDB, id:string):Promise<void>{
  await BaseDatabase.connection(ProjectsDatabase.TABLE_PROJECTS).
  update(Projects4Update).
  where({ id: `${id}` });
  }

 async destroyProject(idToDelete:string):Promise<void>{
  await BaseDatabase.connection(ProjectsDatabase.TABLE_PROJECTS).
  delete().where({ id: idToDelete });
 } 
}