import express from "express";
import importantController from "../controllers/important.js";

const important = (app) => {
  const router = express.Router();
  app.use("/api/important", router);

  router.get("/:userId", importantController.getImportantsByUserId);
  router.get("/:eventId/:userId", importantController.getImportantByEventIdUserId);
  router.put("/:eventId/:userId", importantController.updateImportant);
};

export default important;
