import express from "express";
import { food, user, userDetails, userGoals } from "./resources";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = YAML.load(__dirname + "/../docs/swagger.yaml");
const api = express();
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

// ENDPOINTS FOR DETAILS //
api.get("/api/user/details", userDetails.get);

// ENDPOINTS FOR GOALS //
api.get("/api/user/goals", userGoals.get);

// ENDPOINTS FOR LOGIN AND REGISTRATION //
api.put("/api/register", user.register);
api.post("/api/login", user.login);
api.post("/api/logout", user.logout);

// ENDPOINT FOR UPDATING USER DATA //
api.post("/api/user", user.update);

api.listen(process.env["PORT"] || 3000, () => {
  console.log(
    `Express app is listening at http://localhost:${
      process.env["PORT"] || 3000
    }`
  );
});
