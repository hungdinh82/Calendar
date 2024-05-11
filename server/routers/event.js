import express from "express";
import eventController from "../controllers/event.js";

const event = (app) => {
    const router = express.Router();
    app.use("/api/event", router);
  
    router.get("/currentUser/:id", eventController.getAllEventsByCurrentUser);
    router.get("/getTargets/currentUser/:id", eventController.getAllEventsTargetsByCurrentUser);
    router.get("/:id", eventController.getEventById);
    router.get("/target/:targetId", eventController.getTodosByTarget);
    router.post("/", eventController.createEvent);
    router.put("/:id", eventController.editEvent);
    router.delete("/:id", eventController.deleteEvent);
  };

export default event;
