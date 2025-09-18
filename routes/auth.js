// import express from "express";
// import bcrypt from "bcrypt";
// import User, { IUser } from "../models/User";

// const router = express.Router();

// // POST /api/auth/signup
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, phone, password, bio, photo } = req.body;

//     if (!name || !phone || !password || !bio || !photo) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if phone already exists
//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return res.status(400).json({ message: "Phone number already registered" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = new User({
//       name,
//       phone,
//       password: hashedPassword,
//       bio,
//       photo,
//     });

//     await user.save();

//     return res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


// swipe-backend/routes/auth.js
// import express from "express";
// import bcrypt from "bcrypt";
// import User from "../models/User.js";

// const router = express.Router();

// // POST /api/auth/signup
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, phone, password, bio, photo } = req.body;

//     // Check all fields
//     if (!name || !phone || !password || !bio || !photo) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if phone already exists
//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return res.status(400).json({ message: "Phone number already registered" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = new User({
//       name,
//       phone,
//       password: hashedPassword,
//       bio,
//       photo,
//     });

//     await user.save();

//     return res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // POST /api/auth/login
// router.post("/login", async (req, res) => {
//   try {
//     const { phone, password } = req.body;

//     if (!phone || !password) {
//       return res.status(400).json({ message: "Phone and password required" });
//     }

//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     return res.status(200).json({ message: "Login successful", user });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;




// swipe-backend/routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// GET /api/auth/users
// Optional query params: ?excludeId=<mongoId> or ?excludePhone=<phone>
// Returns users without the password field.
router.get("/users", async (req, res) => {
  try {
    const { excludeId, excludePhone } = req.query;
    const filter = {};

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }
    if (excludePhone) {
      filter.phone = { $ne: excludePhone };
    }

    // exclude password in result
    const users = await User.find(filter).select("-password -__v").lean();
    return res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, phone, password, bio, photo } = req.body;

    if (!name || !phone || !password || !bio || !photo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      password: hashedPassword,
      bio,
      photo,
    });

    await user.save();

    // remove password before returning
    const userSafe = user.toObject();
    delete userSafe.password;

    return res.status(201).json({ message: "User created successfully", user: userSafe });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userSafe = user.toObject();
    delete userSafe.password;

    return res.status(200).json({ message: "Login successful", user: userSafe });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
