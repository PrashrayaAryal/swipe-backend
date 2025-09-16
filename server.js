// // server.js


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// // Load environment variables from .env
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend server is running 🚀");
// });

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));



// server.js


// Load environment variables from .env


// ✅ Load environment variables first
// import dotenv from "dotenv";
// dotenv.config();

// // ✅ Test if the env variable is loaded correctly
// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import authRoutes from "./routes/auth.js"; // ✅ import auth routes

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend server is running 🚀");
// });

// // Routes
// app.use("/api/auth", authRoutes); // ✅ use auth routes

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));


import dotenv from "dotenv";
dotenv.config();

// ✅ Test if the env variable is loaded correctly
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // ✅ import auth routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Increase payload limit to handle large images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

// Routes
app.use("/api/auth", authRoutes); // ✅ use auth routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
