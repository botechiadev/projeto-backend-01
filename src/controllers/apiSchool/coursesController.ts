import { Request, Response } from 'express';
import { db } from '../../database/knexDB';
import { v4 as uuidv4 } from 'uuid';
import { matchDescriptionCategory } from '../../helpers/matchDescriptionCategory';
import { ICourseDB } from '../../interfaces/interfaces';
import { CoursesDatabase } from './../../database/CoursesDatabase';

import { Product } from '../../models/Product';
import { STACKLIST } from '../../types/types';

export const createCourse = async (req: Request, res: Response) => {
    try {
        const { inputName, inputStack, inputImg, inputPrice } = req.body;
        const courseName: string = inputName + " " + inputStack    
        const courseId : string = uuidv4()
        


        if (typeof courseName !=  typeof 'string') {
            res.status(400)
            throw new Error('400: O nome do curso deve seguir o formato "NOME do curso + STACK"');
        }

        if (!inputImg.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            res.status(400)
            throw new Error('400: A imagem deve corresponder a um endereço URL válido');
        }

        const newInstance :Product = new Product(
            courseId,
            courseName,
            "cursos",
            inputImg,
            Number(inputPrice)
        )

        const inputCourse : ICourseDB ={
            id: newInstance.getId(),
            name: newInstance.getName(),
            description: "cursos",      
            image_url: newInstance.getImageUrl(),
            price: newInstance.getPrice()
        }     
        
        const coursesDatabase = new CoursesDatabase()
       

        await coursesDatabase.insertCourse(inputCourse)

        const newCoursesDB : ICourseDB[] | undefined[]= await coursesDatabase.findCoursesById(inputCourse.id)

        if (!newCoursesDB[0]) {
            res.status(404)
            throw new Error(`404: curso nao cadastrado de forma correta para "${inputCourse.id}"`);
        }
        const result: Product[] = newCoursesDB.map(
            (course: ICourseDB) =>
              new Product(
                course.id,
                course.name,
                course.description,
                course.image_url,
                course.price
              )
          );

        res.status(201).send({message: 'Curso cadastrado com sucesso',
        result});
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Erro inesperado');
        }
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string | undefined;

           const coursesDatabase = new CoursesDatabase()

  
            const resultsDB: ICourseDB[]|undefined[] = await coursesDatabase.
            findCourses(q)
            if (!resultsDB[0]) {
                res.status(404)
                throw new Error(`404: Nenhum curso encontrado para "${q}"`);
        
            }


            const result: Product[] = resultsDB.map(
                (course: ICourseDB) =>
                  new Product(
                    course.id,
                    course.name,
                    course.description,
                    course.image_url,
                    course.price
                  )
              );

            res.status(200).send({ message: `Resultado para cursos`, result });
        
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Erro inesperado');
        }
    }
};




export const getCourseById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const coursesDatabase = new CoursesDatabase()
        const resultDB : ICourseDB[]|undefined[]= await coursesDatabase.findCoursesById(id);

        if (!resultDB[0]) {
            res.status(404)
            throw new Error(`404: Curso não cadastrado, verifique o ID "${id}"`);
        } else {

            const result: Product = 
                  new Product(
                    resultDB[0].id,
                    resultDB[0].name,
                    resultDB[0].description,
                    resultDB[0].image_url,
                    resultDB[0].price
                  )
              

            res.status(200).send({message: "CURSO ENCONTRADO NO SISTEMA" , result });
        }
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Erro inesperado');
        }
    }
};

export const destroyCourse = async (req: Request, res: Response) => {
    try {
        const id4Delete = req.params.id;

        const coursesDatabase = new CoursesDatabase()

  
        const courseExists: ICourseDB[]|undefined[] = await coursesDatabase.
        findCoursesById(id4Delete)
        if (!courseExists[0]) {
            res.status(404).send(`404: Produto não encontrado confira o ${id4Delete}`);
            return;
        }

        await coursesDatabase.destroyCourse(id4Delete)

        res.status(200).send({ message: `CURSO com id ${id4Delete} deletado com sucesso` });
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Erro inesperado');
        }
    }
};
export const editCourseById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {  inputImg, inputPrice } = req.body;
  
        const coursesDatabase = new CoursesDatabase()

  
        const courseExists: ICourseDB[]|undefined[] = await coursesDatabase.
        findCoursesById(id)  
        if (!courseExists[0]) {
            res.status(404).send("404: CURSO NÃO CADASTRADO");
            return;
        }
  
        const oldImg: string = courseExists[0].image_url;
        const dataImg: string = inputImg ? inputImg : oldImg;
  
        const oldPrice: number = courseExists[0].price;
        const dataPrice: number = inputPrice !== undefined ? inputPrice : oldPrice;
  
        const newData: Product = new Product(id, courseExists[0].name, "cursos", dataImg, dataPrice);
  
        const course4Update: ICourseDB = {
            id: newData.getId(),
            name: newData.getName(),
            description: "cursos",
            image_url: newData.getImageUrl(),
            price: newData.getPrice(),
        };
  

        

        await coursesDatabase.updateCourse(course4Update, id)  

        const resultDB : ICourseDB[]|undefined[] = await coursesDatabase.findCoursesById( id)  

        if(!resultDB[0]){
            res.status(404)
            throw new Error("404 curso nao cadastrado")
        }

        const result: Product[] = resultDB.map(
            (courseDB: ICourseDB) =>
                new Product(courseDB.id, courseDB.name, courseDB.description, courseDB.image_url, courseDB.price)
        );
  
        res.status(200).send({ message: `Curso com id ${id} atualizado com sucesso`, result });
    } catch (error) {
        console.error(error);
  
        if (res.statusCode === 200) {
            res.status(500);
        }
  
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
  };
