import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import  {userRouter}  from "./src/routes/user.js";
import {recipesRouter } from "./src/routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  'mongodb+srv://bishalkhatiwada13:bishal12345@cluster0.cnxto19.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3001, () => console.log("Server started"));
