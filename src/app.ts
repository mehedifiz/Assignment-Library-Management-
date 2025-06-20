import express, { Application, Request, Response } from "express";
import { bookrouter } from "./controllers/bookController";
import { borrowrouter } from "./controllers/BorrowController";


const app: Application = express();



app.use(express.json())



app.use("/api/books" , bookrouter)
app.use("/api/borrow" , borrowrouter)







export default app;
