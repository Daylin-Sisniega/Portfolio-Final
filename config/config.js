
const config = {
  port: process.env.PORT || 3000,

  // JWT secret (Render lo va a leer desde Environment Variables)
  jwtSecret: process.env.JWT_SECRET || "DAYLIN_PORTFOLIO_SECRET_2025",

  // MongoDB connection string (Render leerá MONGODB_URI)
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://dsisnieg_db_user:Sisniega12@cluster0.ljx9tuc.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0"
};

export default config;
