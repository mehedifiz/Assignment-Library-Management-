import express, { Application, Request, Response } from "express";
import { bookrouter } from "./controllers/bookController";


const app: Application = express();



app.use(express.json())



app.use("/api/books" , bookrouter)







export default app;
