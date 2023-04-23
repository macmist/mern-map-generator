import express from "express";
import cors from "cors";
import { addAPIRouter } from "./app/routes";

const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

addAPIRouter(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
