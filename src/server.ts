import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
async function main() {
  await mongoose.connect("mongodb://localhost:27017");
  console.log("connected to database");

  server = app.listen(3000, () => {
    console.log("server is running ");
  });

  try {
  } catch (error) {
    console.log(error);
  }
}

main()