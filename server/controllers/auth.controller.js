
// import User from '../models/user.model.js'
// import jwt from 'jsonwebtoken'
// import { expressjwt } from 'express-jwt'
// import config from '../../config/config.js'

// // --- Sign in ---
// const signin = async (req, res) => {
//   try {
//     let user = await User.findOne({ "email": req.body.email })
//     if (!user)
//       return res.status(401).json({ error: "User not found" })

//     if (!user.authenticate(req.body.password)) {
//       return res.status(401).send({ error: "Email and password don't match." })
//     }

//     const token = jwt.sign(
//   { _id: user._id },
//   config.jwtSecret,
//   { algorithm: 'HS256' }   // <— se agrega esto
// );

//     res.cookie('t', token, { expire: new Date() + 9999 })

//     return res.json({
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     })
//   } catch (err) {
//     return res.status(401).json({ error: "Could not sign in" })
//   }
// }

// // --- Sign out ---
// const signout = (req, res) => {
//   res.clearCookie("t")
//   return res.status(200).json({
//     message: "signed out"
//   })
// }

// // --- Require Signin (middleware) ---
// const requireSignin = expressjwt({
//   secret: config.jwtSecret,
//   algorithms: ["HS256"],   // Agrega esta línea
//   requestProperty: 'auth',
//   getToken: req => {                   
//     if (req.cookies?.t) return req.cookies.t;
//     const h = req.headers.authorization;
//     if (h && h.startsWith('Bearer ')) return h.split(' ')[1];
//     return null;
//   }
// })

// // --- Has Authorization (middleware) ---
// const hasAuthorization = (req, res, next) => {
//   const authorized = req.profile && req.auth && req.profile._id == req.auth._id
//   if (!authorized) {
//     return res.status(403).json({
//       error: "User is not authorized"
//     })
//   }
//   next()
// }

// export default { signin, signout, requireSignin, hasAuthorization }
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from '../../config/config.js'

// --- Sign in ---
const signin = async (req, res) => {
  try {
    let user = await User.findOne({ "email": req.body.email })
    if (!user)
      return res.status(401).json({ error: "User not found" })

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." })
    }

    // 🔹 TOKEN AHORA INCLUYE ROLE
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwtSecret,
      { algorithm: 'HS256' }   // <— se agrega esto
    );

    res.cookie('t', token, { expire: new Date() + 9999 })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role   // 🔹 NUEVO
      }
    })
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" })
  }
}

// --- Sign out ---
const signout = (req, res) => {
  res.clearCookie("t")
  return res.status(200).json({
    message: "signed out"
  })
}

// --- Require Signin (middleware) ---
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],   // Agrega esta línea
  requestProperty: 'auth',
  getToken: req => {                   
    if (req.cookies?.t) return req.cookies.t;
    const h = req.headers.authorization;
    if (h && h.startsWith('Bearer ')) return h.split(' ')[1];
    return null;
  }
})

// --- Has Authorization (middleware) ---
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized"
    })
  }
  next()
}

// 🔹 NUEVO: SOLO ADMIN
const isAdmin = (req, res, next) => {
  const role = (req.profile && req.profile.role) || (req.auth && req.auth.role)
  if (role !== 'admin') {
    return res.status(403).json({ error: "User is not authorized (admin only)" })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization, isAdmin }
