import express from "express";
import adminController from "../controllers/admin.js";

const admin = (app) => {
  const router = express.Router();
  app.use("/api/admin", router);
  router.get("/", adminController.getAccounts);
  router.post("/", adminController.addAccount);
  router.put("/:id", adminController.updateAccount);
  router.delete("/:id", adminController.deleteAccount);
};

export default admin;
