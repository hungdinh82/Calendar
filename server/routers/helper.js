import express from "express";
import helperController from "../controllers/helper.js";

const helper = (app) => {
    const router = express.Router();
    app.use("/api/helper", router);
    router.get("/:eventId", helperController.getAllHelperByEventId);
    router.get("/creator/:id", helperController.getAllHelperAndCreatorByTodoId);
  };
  

export default helper;
