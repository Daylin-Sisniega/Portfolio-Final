// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Home from './components/Home'
// import About from './about'
// import Contact from './contact'
// import Education from './education'
// import Project from './project'
// import Services from './services'
// import Layout from './components/Layout'

// //Importaciones nuevas
// import Signin from './auth/Signin'
// import Signup from './user/Signup'
// import Users from './user/Users'
// import Profile from './user/Profile';   
// import PrivateRoute from './auth/PrivateRoute'

// const MainRouter = () => {
//   return (
//     <div>
//       <Layout />

//       <Routes>
//         {/* Páginas existentes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/education" element={<Education />} />
//         <Route path="/project" element={<Project />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/services" element={<Services />} />

//         {/* Nuevas rutas Auth */}
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Ruta protegida (solo si está logeado) */}
//         <Route
//           path="/users"
//           element={
            
//               <Users />
            
//           }
//         />
//       </Routes>
//     </div>
//   )
// }

// export default MainRouter
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './about'
import Contact from './contact'
import Education from './education'
import Project from './project'
import Services from './services'
import Layout from './components/Layout'

// Importaciones nuevas
import Signin from './auth/Signin'
import Signup from './user/Signup'
import Users from './user/Users'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'

const MainRouter = () => {
  return (
    <div>
      <Layout />

      <Routes>
        {/* Páginas existentes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        {/* Auth */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protegidas */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* (Opcional) Users como lo tenías */}
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default MainRouter
