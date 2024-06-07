import express from "express";
import eventController from "../controllers/event.js";

const event = (app) => {
    const router = express.Router();
    app.use("/api/event", router);
  
    router.get("/currentUser/:id", eventController.getAllEventsByCurrentUser);
    router.get("/getTargets/currentUser/:id", eventController.getAllEventsTargetsByCurrentUser);
    router.get("/target/:targetId/todos", eventController.getAllTodoByTargetId);
    router.get("/:id", eventController.getEventById);
    router.get("/target/:targetId", eventController.getTodosByTarget);
    router.post("/", eventController.createEvent);
    router.put("/:id", eventController.editEvent);
    router.put("/target/:id", eventController.editTarget);
    router.delete("/:id", eventController.deleteEvent);
  };

export default event;
