import express from "express";
import { food, goals, user } from "./resources";
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
// maybe pass params for endpoints inside body instead of part of URL
api.put("/api/food", food.store);

api.post("/api/food", food.update);

api.get("/api/food", food.get);
api.get("/api/food/id/:id", food.getById);
api.get("/api/food/name/:name", food.getByName);

api.delete("/api/food/:id", food.deleteFood);

// END OINTS FOR USER //

// api.put('/api/user', user.store);

// END POINTS FOR GOALS //
api.post("/api/goals", userGoals.update);
api.get("/api/goals", userGoals.get);

// END POINTS FOR LOGIN AND REGISTRATION
api.post("/api/register", user.register);
api.get("/api/login", user.login);

api.listen(process.env["PORT"] || 3000, () => {
  console.log(
    `Express app is listening at http://localhost:${
      process.env["PORT"] || 3000
    }`
  );
});
