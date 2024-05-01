import express from "express";
import userController from "../controllers/user.js";

const user = (app) => {
  const router = express.Router();
  app.use("/api/user", router);
  router.post("/signIn", userController.signIn);
  router.post("/signUp", userController.signUp);
  router.get("/:mail", userController.getUserByMail); 
  router.post("/", userController.getUserByMails); 
};

export default user;
