// import express from "express";
// import {
//   getAllProjects,
//   getProjectById,
//   createProject,
//   updateProject,
//   deleteProjectById,
//   deleteAllProjects,
// } from "../controllers/project.controller.js";

// const router = express.Router();

// router.get("/", getAllProjects);
// router.get("/:id", getProjectById);
// router.post("/", createProject);
// router.put("/:id", updateProject);
// router.delete("/:id", deleteProjectById);
// router.delete("/", deleteAllProjects);

// export default router;
import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProjectById,
  deleteAllProjects,
} from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";  // 🔹 NUEVO

const router = express.Router();

// READ: todos pueden ver
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// CREATE, UPDATE, DELETE: solo ADMIN
router.post(
  "/",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  createProject
);

router.put(
  "/:id",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  updateProject
);

router.delete(
  "/:id",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  deleteProjectById
);

router.delete(
  "/",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  deleteAllProjects
);

export default router;
