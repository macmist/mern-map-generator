import express from "express";
import { mapController } from "../controllers/mapController";

export const mapRouter = (router: express.Router) => {
  const controller = mapController();
  router
    .route("/maps/generate")
    .get(controller.generate)
    .post(controller.generate);
};
