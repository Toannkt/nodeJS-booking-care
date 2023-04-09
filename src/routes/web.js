/** @format */

import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
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
      router.get("/api/get-all-doctor", doctorController.getAllDoctor);
      router.post("/api/create-detail-doctors", doctorController.createDetailDoctors);
      router.get("/api/get-detail-doctor", doctorController.getDetailDoctor);
      router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
      router.get("/api/get-schedule-doctor-by-data", doctorController.getScheduleByDate);
      router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraDoctorById);
      // router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);

      router.post("/api/patient-book-appointment", patientController.postBookAppointment);
      router.post("/api/verify-book-appointment", patientController.postVerifyBookAppointment);

      router.post("/api/create-specialty", specialtyController.createSpecialty);
      router.get("/api/get-specialty", specialtyController.getAllSpecialty);
      router.get("/api/get-detail-specialty", specialtyController.getDetailSpecialty);

      router.post("/api/create-clinic", clinicController.createClinic);

      return app.use("/", router);
};

module.exports = initWebRoutes;
