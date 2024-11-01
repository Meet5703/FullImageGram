import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: /^\S+@\S+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
