import express from 'express'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

//Ruta para iniciar sesión
router.route('/auth/signin')
  .post(authCtrl.signin)

//Ruta para cerrar sesión
router.route('/auth/signout')
  .get(authCtrl.signout)

export default router
