/** @format */

import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRoutes = (app) => {
      router.get("/", homeController.getHomePage);
      router.get("/crud", homeController.getCrud);

      router.post("/post-crud", homeController.postCrud);
      router.get("/get-crud", homeController.displayGetCrud);
      router.get("/edit-crud", homeController.getEditCRUD);
      router.post("/put-crud", homeController.putCRUD);
      router.get("/destroy-crud", homeController.destroyCRUD);

      router.post("/api/login", userController.handleLogin);
      router.get("/api/get-all-users", userController.handleGetAllUsers);
      router.post("/api/create-new-user", userController.handleCreateNewUser);
      router.put("/api/edit-user", userController.handleEditNewUser);
      router.delete("/api/delete-user", userController.handleDeleteNewUser);

      router.get("/api/allcodes", userController.getAllCode);
      router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
      return app.use("/", router);
};

module.exports = initWebRoutes;
