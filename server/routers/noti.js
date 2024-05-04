import express from "express";
import notiController from "../controllers/noti.js";

const noti = (app) => {
    const router = express.Router();
    app.use("/api/noti", router);
    router.get('/:toMail', notiController.getAllNotificationsByToMail); 
    router.put('/:id', notiController.updateNotification);
    router.delete('/:id', notiController.deleteNotification);
};


export default noti;
