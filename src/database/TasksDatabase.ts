import { ITasksDB } from '../interfaces/interfaces';
import {BaseDatabase} from './BaseDatabase'

export class TasksDatabases extends BaseDatabase{
 public static TABLE_TASKS = "tasks"
 
 async findTasks(q:string|undefined):Promise<ITasksDB[]|undefined[]>{


  if(!q){
    const result: ITasksDB[] = await BaseDatabase.connection(TasksDatabases.TABLE_TASKS)
    const TasksDB = result;

  return TasksDB
} else{
  const result = await BaseDatabase.connection(TasksDatabases.TABLE_TASKS).
  where( "title","LIKE", `%${q}%`)
    const TasksDB = result;

  return TasksDB
}
 }



async findTasksById(id:string):Promise<ITasksDB[]|undefined[]>{

  const result = await BaseDatabase.connection(TasksDatabases.TABLE_TASKS).
  where( "id","LIKE", `%${id}%`)

    const TasksDB = result
  return TasksDB
}


async findTasksId(id:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT id FROM ${TasksDatabases.TABLE_TASKS} WHERE id LIKE ${id}`)
 

    const TaskId = result
  return TaskId
}


async insertTask (Projects4Insert: ITasksDB):Promise<void>{
await BaseDatabase.connection(TasksDatabases.TABLE_TASKS).insert(Projects4Insert)
  
}

async updateTask (Projects4Update: ITasksDB, id:string):Promise<void>{
  await BaseDatabase.connection(TasksDatabases.TABLE_TASKS).
  update(Projects4Update).
  where({ id: `${id}` });
  }

 async destroyTask(idToDelete:string):Promise<void>{
  await BaseDatabase.connection(TasksDatabases.TABLE_TASKS).
  delete().where({ id: idToDelete });
 } 
}