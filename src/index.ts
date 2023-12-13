import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT

import path from 'path';
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();


import morgan from "morgan";


app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "./../public/")))
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("projeto-backend-01");
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
