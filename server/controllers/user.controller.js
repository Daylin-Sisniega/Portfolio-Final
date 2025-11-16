
// import User from '../models/user.model.js'


// // Crear usuario
// const create = async (req, res) => {
//   const user = new User(req.body)
//   try {
//     await user.save()
//     return res.status(200).json({ message: 'Successfully signed up!' })
//   } catch (err) {
//     return res.status(400).json({ error: err.message || 'Unable to create user' })
//   }
// }

// // Listar usuarios
// const list = async (req, res) => {
//   try {
//     const users = await User.find().select('name email updated created')
//     res.json(users)
//   } catch (err) {
//     return res.status(400).json({ error: err.message || 'Unable to list users' })
//   }
// }

// // Param middleware: carga usuario por :userId y lo pone en req.profile
// const userByID = async (req, res, next, id) => {
//   try {
//     const user = await User.findById(id)
//     if (!user) return res.status(400).json({ error: 'User not found' })
//     req.profile = user
//     next()
//   } catch (err) {
//     return res.status(400).json({ error: 'Could not retrieve user' })
//   }
// }

// // Leer perfil (sanitizado)
// const read = (req, res) => {
//   const user = req.profile.toObject()
//   delete user.hashed_password
//   delete user.salt
//   return res.json(user)
// }

// // Actualizar
// const update = async (req, res) => {
//   try {
//     let user = req.profile
//     Object.assign(user, req.body)
//     user.updated = Date.now()
//     await user.save()
//     const out = user.toObject()
//     delete out.hashed_password
//     delete out.salt
//     res.json(out)
//   } catch (err) {
//     return res.status(400).json({ error: err.message || 'Unable to update user' })
//   }
// }

// // Eliminar
// const remove = async (req, res) => {
//   try {
//     const deleted = await req.profile.deleteOne()
//     const out = deleted.toObject ? deleted.toObject() : deleted
//     if (out) {
//       delete out.hashed_password
//       delete out.salt
//     }
//     res.json(out || { message: 'Deleted' })
//   } catch (err) {
//     return res.status(400).json({ error: err.message || 'Unable to delete user' })
//   }
// }

// export default { create, list, userByID, read, update, remove }
import User from '../models/user.model.js'

// Crear usuario
const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({ message: 'Successfully signed up!' })
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Unable to create user' })
  }
}

// Listar usuarios
const list = async (req, res) => {
  try {
    const users = await User.find().select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Unable to list users' })
  }
}

// Cargar :userId → req.profile
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) return res.status(400).json({ error: 'User not found' })
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve user' })
  }
}

// Ver perfil
const read = (req, res) => {
  const user = req.profile.toObject()
  delete user.hashed_password
  delete user.salt
  return res.json(user)
}

// Actualizar usuario
const update = async (req, res) => {
  try {
    let user = req.profile
    Object.assign(user, req.body)
    user.updated = Date.now()
    await user.save()

    const sanitized = user.toObject()
    delete sanitized.hashed_password
    delete sanitized.salt

    res.json(sanitized)
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Unable to update user' })
  }
}

// Eliminar usuario
const remove = async (req, res) => {
  try {
    const deleted = await req.profile.deleteOne()
    const out = deleted.toObject()
    delete out.hashed_password
    delete out.salt
    res.json(out)
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Unable to delete user' })
  }
}

export default { create, list, userByID, read, update, remove }
