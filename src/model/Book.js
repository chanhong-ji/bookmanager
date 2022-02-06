import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  isbn: { type: Number, required: true },
  title: { type: String, required: true, trim: true, maxLength: 80 },
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
