import { Request, Response } from "express";
import { db } from "../../database/knexDB";
import {  STACKLIST, TProductDB } from '../../types/types';
import { createId } from "../../helpers/createId";
import { DESCRIPTION_CATEGORY } from "../../types/types";
import { matchDescriptionCategory } from "../../helpers/matchDescriptionCategory";
import { Product } from "../../models/Product";
import {v4 as uuidv4} from 'uuid';
import { IProjectDB, IUserDB } from "../../interfaces/interfaces";
import { ProjectsDatabase } from '../../database/ProjectsDatabase';
import { UserDatabase } from '../../database/UserDatabase';

import { Project } from '../../models/Project';
import { createAccount } from '../apiBank/accountsController';
export const createProjects = ( async (req: Request, res: Response) => {

    try{
        const newId = uuidv4() as string;
        const newProjectName = req.body.inputProjectName as string
        const newAuthor = req.body.inputAuthor as string | undefined
        const newDescription = req.body.inputDescription as string 
        const newDeploy = req.body.inputDeploy as string | undefined
        const newRepo = req.body.inputRepo as string | undefined
        const newImage = req.body.inputImg as string | undefined
        const newScore = req.body.inputScore as number | undefined
        const newStack = req.body.inputStack as STACKLIST | undefined
        const today = new Date().toISOString()

        if (newProjectName && newProjectName.trim().toString().length < 3 && newProjectName.trim().toString().length > 60) {
            res.status(400)
            throw new Error ('400 nome do deve ser "string" com total de caracteres entre 3 e 60')
        }

        if (!newProjectName) {
            res.status(400)
            throw new Error ('400 nome do projeto deve ser INFORMADO em campo do formulario')
        }

       
        if (newProjectName && typeof newProjectName != typeof "string" ) {
            res.status(400)
            throw new Error ('400 nome do deve ser "string" com caracteres alfa numericos ')
        }
        if (!newAuthor  ) {
            res.status(400)
            throw new Error ('400 id do AUTOR deve ser INFORMADO em campo do formulario')
        }

        const userDatabase = new UserDatabase()
        const confirmAuthor: Promise<IUserDB[] | undefined[]>= userDatabase.findUserById(newAuthor)
        if(!confirmAuthor){
            throw new Error(`O id : ${newAuthor} NAO ESTA CADASTRADO, cadastre seu usuario antes de postar o projeto`)
        }


        if (newAuthor && typeof newAuthor != typeof "string" ) {
            res.status(400)
            throw new Error ('400 id do Autor deve ser "string" com caracteres alfa numericos ')
        }

        if (newDescription && newDescription.trim().toString().length < 3 && newDescription.trim().toString().length > 140) {
            res.status(400)
            throw new Error ('400 nome do deve ser "string" com total de caracteres entre 3 e 140 ')
        }

        if (!newDescription  ) {
            res.status(400)
            throw new Error ('400 DESCRICAO deve ser INFORMADO em campo do formulario')
        }

       
        if (newDescription && typeof newDescription != typeof "string" ) {
            res.status(400)
            throw new Error ('400 DESCRICAO DO PROJETO deve ser "string" com caracteres alfa numericos ')
        }
        
        if (newImage && !newImage.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
            res.status(400)
            throw new Error ("400: imagem deve corresponder a endereço URL VALIDO")
        }
        const classProject = new Project(
            newId,
            newProjectName,
            newAuthor,
            newStack,
            newScore, 
            newDescription,
            newDeploy,
            newRepo,
            newImage,
            0,
            0, 
            today,
            today
          )

        const project4Insert : IProjectDB ={
            id: classProject.getId(),
            projectName: classProject.getProjectName(),
            author: classProject.getAuthor(),
            stack: classProject.getStack(),
            score: classProject.getScore(),
            description: classProject.getDescription(),
            deploy : classProject.getDeploy(),
            repo: classProject.getRepo(),
            imgUrl:classProject.getImgUrl(),
            likes :classProject.getLikes(),
            dislikes :classProject.getDislikes(),
            createdAt: classProject.getCreatedAt(),
            updateAt: today
        }


        const projectDatabase = new ProjectsDatabase()



        await projectDatabase.insertProject(project4Insert)
        
        const projectDB = await projectDatabase.findProjectsById(classProject.getId())

    
        res.status(201).send("projeto cadastrado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


export const getAllProjects=( async (req: Request, res: Response) => {
    try {

        const q = req.query.q as string || undefined
     

    const projectsDatabase = new ProjectsDatabase()
    const resultsDB: IProjectDB[]|undefined[] = await projectsDatabase.findProjects(q)
                if (!resultsDB[0]) {
                    res.status(404)
                    throw new Error(`404: Nenhum curso encontrado para "${q}"`);
            
                }
    if(!resultsDB[0]){
        res.status(404)
        throw new Error('404 Projeto nao cadastrado')
    }

    
                const result: Project[] = resultsDB.map(
                    (project: IProjectDB) =>
                      new Project(
                        project.id,
                        project.projectName,
                        project.author,
                        project.stack,
                        project.score, 
                        project.description,
                        project.deploy,
                        project.repo,
                        project.imgUrl,
                        project.likes,
                        project.dislikes, 
                        project.createdAt,
                        project.updateAt
                      )
                  );
    
                res.status(200).send({ message: `Resultado para cursos`, result })
    }
    catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});


export const editProjectById = async (req: Request, res: Response) => {
    try {
        const today = new Date().toISOString() as string;
        const id = req.params.id as string;

        // Fetch the project by ID
        const [projectExists] = await db("projects").where({ id });

        if (!projectExists) {
            res.status(404).json({ error: "404: Produto não cadastrado" });
            return;
        }

        // Update logic
        const likes4Update = req.body.inputLikes as number;
        const dislikes4Update = req.body.inputDislikes as number;

        const updatedLikes = req.body.inputLike ===1 ? projectExists.likes + 1 : projectExists.likes;
        const updatedDislikes =  req.body.inputLike ===1 ? projectExists.dislikes + 1 : projectExists.dislikes;

        const updatedAt = today;

        // Prepare the updated project data
        const project4Class = {
            id: id,
            projectName: req.body.inputName || projectExists.projectName,
            stack: req.body.inputStack || projectExists.stack,
            author: req.body.inputAuthor || projectExists.author,
            score: req.body.inputScore || projectExists.score,
            description: req.body.inputDescription || projectExists.description,
            deploy: req.body.inputDeploy || projectExists.deploy,
            repo: req.body.inputRepo || projectExists.repo,
            imgUrl: req.body.inputImg || projectExists.imgUrl,
            likes:  req.body.inputLike === 1 ? projectExists.likes+=1 : projectExists.likes,
            dislikes: req.body.inputDislike === 1 ? projectExists.dislikes+=1 : projectExists.dislikes,
            createdAt: projectExists.createAt,
            today
        };

        const class4Update:Project = new Project(
            project4Class.id,
            project4Class.projectName,
            project4Class.author,
            project4Class.stack,
            project4Class.score,
            project4Class.description,
            project4Class.deploy,
            project4Class.repo,
            project4Class.imgUrl,
            project4Class.likes,
            project4Class.dislikes,
            project4Class.createdAt,
            today
        )

        const project4Insert :IProjectDB = {
            id: class4Update.getId(),
            projectName: class4Update.getProjectName(),
            author: class4Update.getAuthor(),
            stack: class4Update.getStack(),
            score: class4Update.getScore(),
            description: class4Update.getDescription(),
            deploy: class4Update.getDeploy(),
            repo: class4Update.getRepo(),
            imgUrl: class4Update.getImgUrl(),
            likes: class4Update.getLikes(),
            dislikes: class4Update.getDislikes(),
            createdAt: class4Update.getCreatedAt(),
            updateAt: today
        }

 
        const id4Update = req.params.id as string
        
        const projectsDatabase = new ProjectsDatabase()
        await projectsDatabase.updateProjects(project4Insert, id4Update)
        const resultDB = await projectsDatabase.findProjectsById(id4Update)

        const result: Project[] = resultDB.map(
            (project: IProjectDB) =>
              new Project(
                project.id,
                project.projectName,
                project.author,
                project.stack,
                project.score, 
                project.description,
                project.deploy,
                project.repo,
                project.imgUrl,
                project.likes,
                project.dislikes, 
                project.createdAt,
                project.updateAt
              )
          );


        res.status(200).json({ message: "Produto atualizado com sucesso", result });
    } catch (error) {
        console.log(error);

        if (res.statusCode != 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.json({ error: error.message });
        } else {
            res.json({ error: "Erro inesperado" });
        }
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const projectsDatabase = new ProjectsDatabase()
        const resultDB = await projectsDatabase.findProjectsById(id)

        if (!resultDB[0]) {
            res.status(404).json({ error: "PRODUTO não Cadastrado, verifique o 'id'" });
        }
           
    
        const result: Project[] = resultDB.map(
            (project: IProjectDB) =>
              new Project(
                project.id,
                project.projectName,
                project.author,
                project.stack,
                project.score, 
                project.description,
                project.deploy,
                project.repo,
                project.imgUrl,
                project.likes,
                project.dislikes, 
                project.createdAt,
                project.updateAt
              )
          );

        res.status(200).send({ message: `Resultado para cursos`, result })
 
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
       res.status(500);
       }

        if (error instanceof Error) {
            res.json({ error: error.message });
        } else {
            res.json({ error: "Erro inesperado" });
        }
    }
};

export const destroyProject = ( async (req: Request, res: Response) => {

    try {
        const id4Delete = req.params.id

        const projectsDatabase = new ProjectsDatabase()
        const resultDB = await projectsDatabase.findProjectsById(id4Delete)       
         
        if (!resultDB[0]) {
            throw new Error("404 projeto nao cadastrado")
        }

        await projectsDatabase.destroyProject(id4Delete)       
         
        res.status(200).send({ message: `projeto com id ${id4Delete} deletado com sucesso` })
    }
    catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})