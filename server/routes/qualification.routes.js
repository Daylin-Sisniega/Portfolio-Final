import express from "express";
import {
  getAllQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualificationById,
  deleteAllQualifications,
} from "../controllers/qualification.controller.js";

const router = express.Router();

router.get("/", getAllQualifications);
router.get("/:id", getQualificationById);
router.post("/", createQualification);
router.put("/:id", updateQualification);
router.delete("/:id", deleteQualificationById);
router.delete("/", deleteAllQualifications);

export default router;
