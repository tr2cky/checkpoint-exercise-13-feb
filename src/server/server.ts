import express from "express";
import cors from "cors";
import {
  deleteById,
  getAll,
  updateById,
  create,
} from "./controllers/controller.js";


const app = express();

app.use(express.json());

app.use(cors());
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/api/posts", getAll);

app.post("/api/posts", create);

app.put("/api/posts/:id", updateById);

app.delete("/api/posts/:id", deleteById);
