
// import express from "express";
// import {
//   getAllUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUserById,
//   deleteAllUsers,
// } from "../controllers/user.controller.js";
// import authCtrl from "../controllers/auth.controller.js"; //importa auth controller

// const router = express.Router();

// //Listar y crear usuarios
// router.get("/", getAllUsers);
// router.post("/", createUser);

// router.param("id", userByID);   
// //Obtener, actualizar o eliminar un usuario específico (protegido)
// router.get("/:id", authCtrl.requireSignin, getUserById);
// router.put("/:id", authCtrl.requireSignin, authCtrl.hasAuthorization, updateUser);
// router.delete("/:id", authCtrl.requireSignin, authCtrl.hasAuthorization, deleteUserById);

// //Eliminar todos los usuarios (opcional, si quieres mantenerlo sin protección)
// router.delete("/", deleteAllUsers);

// export default router;
import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Listar y crear usuarios
router.route("/")
  .get(userCtrl.list)
  .post(userCtrl.create);

// Cargar :userId en req.profile
router.param("userId", userCtrl.userByID);

// Obtener / actualizar / eliminar un usuario específico (protegido)
router.route("/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

export default router;
