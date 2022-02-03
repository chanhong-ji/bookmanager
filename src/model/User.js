import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String },
  socialOnly: { type: Boolean, default: false, required: true },
  books: [{ type: mongoose.Types.ObjectId, ref: "Books" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
    return this.password;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
