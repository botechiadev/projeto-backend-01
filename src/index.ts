import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from 'path';

import bandsRouter from "./router/apiMusic/bands";
import frotaRouter from "./router/apiCars/frota";
import songsRouter from "./router/apiMusic/songs";
import usersRouter from "./router/apiUsers/users";
import purchasesRouter from "./router/apiAdmin/purchases";
import projectsRouter from "./router/apiSchool/projects";
import postsRouter from "./router/apiPosts/posts";

import coursesRouter from "./router/apiSchool/courses";
//import purchasesRouter from './router/purchases'
const app = express();
import { ROLES } from "./models/User";
//import { Purchases, ProductPurchased } from './models/Purchases';


// templates

import { HeaderDoc } from "./containers/HeaderDoc/HeaderDoc";
import { AsideDoc } from "./containers/AsideDoc/AsideDoc";
import { UsersDoc } from "./containers/UsersDoc/UsersDoc";
import {BuildingProcess} from './containers/BuildingProcess/BuildingProcess'
import {FooterDoc} from "./containers/FooterDoc/FooterDoc";
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "./../public/")))
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/posts", postsRouter);
app.use("/courses", coursesRouter);
app.get("/", (req: Request, res: Response) => {
  res.send(`
${HeaderDoc}
${AsideDoc}
<main>
 ${UsersDoc}
</main>
${FooterDoc}
`
  );
});

app.get("/building-process", (req: Request, res: Response) => {
  res.send(`
${HeaderDoc}
${AsideDoc}
<main>
 ${BuildingProcess}
</main>
${FooterDoc}
`
  );
});

app.listen(3004, () => {
  console.log(`Servidor rodando na porta 3004`);
});
