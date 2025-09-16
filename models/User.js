// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   phone: string;
//   password: string;
//   bio: string;
//   photo: string;
//   createdAt: Date;
// }

// const UserSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   bio: { type: String, required: true },
//   photo: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model<IUser>("User", UserSchema);


// swipe-backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, required: true },
  photo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

export default User;
