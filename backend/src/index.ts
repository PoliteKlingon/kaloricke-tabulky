import express from "express";
import { food } from "./resources"


const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use(express.static("public"));


api.get('/', (_, res) => res.send({
  status: "success",
  data: {},
  message: "Welcome to our API"
}));

api.get("/food", food.get);
api.get("/food/:id", food.getById);

api.listen(3000)