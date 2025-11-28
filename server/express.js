// import express from "express";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import compress from "compression";
// import cors from "cors";
// import helmet from "helmet";

// // Importar rutas
// import userRoutes from './routes/user.routes.js'
// import authRoutes from './routes/auth.routes.js'

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(compress());
// app.use(helmet());
// app.use(cors());

// // Rutas
// app.use('/', userRoutes)
// app.use('/', authRoutes)

// export default app;

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

// Importar rutas
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Soporte para JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/", userRoutes);
app.use("/", authRoutes);

// Middlewares de configuración
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

//Manejo de errores de autorización (express-jwt)
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
