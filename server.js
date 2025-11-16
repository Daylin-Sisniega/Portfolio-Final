// // export default app;
// import express from "express";
// import mongoose from "mongoose";
// import config from "./config/config.js";
// import cors from "cors";

// // 🔹 NUEVO: cookies para leer el token (req.cookies.t)
// import cookieParser from "cookie-parser";

// // Importar rutas
// import contactRoutes from "./server/routes/contact.routes.js";
// import projectRoutes from "./server/routes/project.routes.js";
// import qualificationRoutes from "./server/routes/qualification.routes.js";
// import userRoutes from "./server/routes/user.routes.js";
// import authRoutes from "./server/routes/auth.routes.js";

// const app = express();
// app.use(express.json());

// // 🔹 NUEVO: habilita lectura de cookies antes de las rutas
// app.use(cookieParser());

// // Conexión MongoDB
// mongoose.connect(config.mongoUri)
//   .then(() => console.log(" Connected to the database"))
//   .catch((err) => console.error(" Database connection error:", err));

// // Rutas API
// app.use("/api/contacts", contactRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/qualifications", qualificationRoutes);
// app.use("/api/users", userRoutes);
// app.use("/", authRoutes);

// // Root endpoint
// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Welcome to the backend of MyPortfolio");
// });


// // Start server
// app.listen(config.port, () => {
//   console.log(` Backend running at: http://localhost:${config.port}/`);
// });

// export default app;
// export default app;
import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import cors from "cors";
import cookieParser from "cookie-parser"; // ← leer cookies

// Importar rutas
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ CORS: permitir peticiones desde Vite (5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// ❌ NO uses: app.options("*", cors());  ← esto causaba el crash

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
