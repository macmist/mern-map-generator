import express, { Express } from "express";
import { mapRouter } from "./mapRouter";

export const addAPIRouter = (app: Express) => {
  const router = express.Router();
  router.use((req, res, next) => {
    res.contentType("application/json");
    next();
  });
  mapRouter(router);
  app.use("/api", router);
};
