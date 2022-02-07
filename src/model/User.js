import mongoose from "mongoose";
import bcrypt from "bcrypt";

const BookSchema = new mongoose.Schema({
  isbn: { type: Number, required: true },
  title: { type: String, required: true, trim: true, maxLength: 80 },
  imgUrl: { type: String, required: true },
  category: { type: String, default: "new" },
  details: [{ type: mongoose.Types.ObjectId, ref: "Detail" }],
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  socialOnly: { type: Boolean, default: false, required: true },
  categories: [{ type: String }],
  shelves: [BookSchema],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
    return this.password;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
