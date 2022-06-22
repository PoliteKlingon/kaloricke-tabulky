import express from "express";
import { food, user } from "./resources";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = YAML.load(__dirname + "/../docs/swagger.yaml");
const api = express();
// TODO figure better way how to solve CORS
const cors = require("cors");
api.use(cors());
api.use(express.json());
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
api.use(express.urlencoded({ extended: true }));

api.use(express.static("public"));

api.get("/", (_, res) =>
  res.send({
    status: "success",
    data: {},
    message: "Welcome to our API",
  })
);

// ENDPOINTS FOR FOOD //
api.put("/api/food", food.store);
api.post("/api/food", food.update);
api.get("/api/food", food.get);
api.get("/api/food/id/:id", food.getById);
api.get("/api/food/name/:name", food.getByName);

api.delete("/api/food/:id", food.deleteFood);

// GETTING INFORMATION ABOUT USER //
api.get("/api/user", user.get);

// ENDPOINTS FOR LOGIN AND REGISTRATION //
api.post("/api/register", user.register);
api.post("/api/login", user.login);
api.post("/api/logout", user.logout);

// ENDPOINT FOR UPDATING USER DATA //
api.put("/api/user", user.update);
api.put("/api/user/password", user.updatePassword);

api.listen(process.env["PORT"] || 3000, () => {
  console.log(
    `Express app is listening at http://localhost:${
      process.env["PORT"] || 3000
    }`
  );
});
