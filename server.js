// import express from "express";
// import mongoose from "mongoose";
// import config from "./config/config.js";
// import cors from "cors";
// import cookieParser from "cookie-parser"; // ← leer cookies

// // Importar rutas
// import contactRoutes from "./server/routes/contact.routes.js";
// import projectRoutes from "./server/routes/project.routes.js";
// import qualificationRoutes from "./server/routes/qualification.routes.js";
// import userRoutes from "./server/routes/user.routes.js";
// import authRoutes from "./server/routes/auth.routes.js";

// const app = express();

// app.use(express.json());
// app.use(cookieParser());



// const allowedOrigins = [
//   "http://localhost:5173",                // Vite local
//   "https://portfolio0212.netlify.app",    // tu frontend en producción
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true); // permite Thunder Client / Insomnia
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   })
// );

// // Conexión MongoDB
// mongoose
//   .connect(config.mongoUri)
//   .then(() => console.log(" Connected to the database"))
//   .catch((err) => console.error(" Database connection error:", err));

// // Rutas API
// app.use("/api/contacts", contactRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/qualifications", qualificationRoutes);
// app.use("/api/users", userRoutes);
// app.use("/", authRoutes);

// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Welcome to the backend of MyPortfolio");
// });

// // Start server
// app.listen(config.port, () => {
//   console.log(` Backend running at: http://localhost:${config.port}/`);
// });

// export default app;

import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Importar rutas
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS: permitir Vite local y Netlify
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio0212.netlify.app"
    ],
    credentials: true,
  })
);

// Conexión MongoDB
mongoose
  .connect(config.mongoUri)
  .then(() => console.log(" Connected to the database"))
  .catch((err) => console.error(" Database connection error:", err));

// Rutas API
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);
app.use("/", authRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the backend of MyPortfolio");
});

// Start server
app.listen(config.port, () => {
  console.log(` Backend running at: http://localhost:${config.port}/`);
});

export default app;
