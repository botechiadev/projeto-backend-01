import { ICoursesDB } from '../interfaces/interfaces';
import {BaseDatabase} from './BaseDatabase'

export class CoursesDatabase extends BaseDatabase{
 public static TABLE_PRODUCTS = "products"
 
 async findCourses(q:string|undefined):Promise<ICoursesDB[]|undefined[]>{


  if(!q){
    const result: ICoursesDB[] = await BaseDatabase.connection(CoursesDatabase.TABLE_PRODUCTS).where("description", "LIKE" , "cursos")
    const coursesDB = result;

  return coursesDB
} else{
  const result = await BaseDatabase.connection(CoursesDatabase.TABLE_PRODUCTS).
  where( "name","LIKE", `%${q}%`).
  andWhere("description", "LIKE" , "cursos")
    const coursesDB = result;

  return coursesDB
}
 }



async findCoursesById(id:string):Promise<ICoursesDB[]|undefined[]>{

  const result = await BaseDatabase.connection(CoursesDatabase.TABLE_PRODUCTS).
  where( "id","LIKE", `%${id}%`).
  where("description", "LIKE" , "cursos")


    const CoursesDB = result
  return CoursesDB
}


async findCoursesId(id:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT id FROM ${CoursesDatabase.TABLE_PRODUCTS} WHERE id LIKE ${id}`)
 

    const CoursesId = result
  return CoursesId
}

async findCoursesEmail(email:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT email FROM ${CoursesDatabase.TABLE_PRODUCTS} WHERE email LIKE ${email}`)
 

    const CoursesEmail = result
  return CoursesEmail
}

async findCoursesNickname(nickname:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT nickname FROM ${CoursesDatabase.TABLE_PRODUCTS} WHERE nickname LIKE ${nickname}`)
 

    const CoursesNickname = result
  return CoursesNickname
}
async insertCourse (Courses4Insert: ICoursesDB):Promise<void>{
await BaseDatabase.connection(CoursesDatabase.TABLE_PRODUCTS).insert(Courses4Insert)
  
}

async updateCourse (Courses4Update: ICoursesDB, id:string):Promise<void>{
  await BaseDatabase.connection(CoursesDatabase.TABLE_PRODUCTS).
  update(Courses4Update).
  where({ id: `${id}` });
  }

 async destroyCourse(idToDelete:string):Promise<void>{
  await BaseDatabase.connection(CoursesDatabase.TABLE_PRODUCTS).
  delete().where({ id: idToDelete });
 } 
}