// import express from "express";
// import {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContact,
//   deleteContactById,
//   deleteAllContacts,
// } from "../controllers/contact.controller.js";

// const router = express.Router();

// router.get("/", getAllContacts);
// router.get("/:id", getContactById);
// router.post("/", createContact);
// router.put("/:id", updateContact);
// router.delete("/:id", deleteContactById);
// router.delete("/", deleteAllContacts);

// export default router;
import express from "express";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContactById,
  deleteAllContacts,
} from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";  // 🔹 NUEVO

const router = express.Router();

// READ: todos pueden ver
router.get("/", getAllContacts);
router.get("/:id", getContactById);

// CREATE, UPDATE, DELETE: solo ADMIN
router.post(
  "/",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  createContact
);

router.put(
  "/:id",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  updateContact
);

router.delete(
  "/:id",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  deleteContactById
);

router.delete(
  "/",
  authCtrl.requireSignin,
  authCtrl.isAdmin,
  deleteAllContacts
);

export default router;
