import express from "express";
import userController from "../controllers/User.js";

const user = (app) => {
  const router = express.Router();
  app.use("/api/user", router);
  router.post("/signIn", userController.signIn);
  router.post("/signUp", userController.signUp);
};

export default user;
