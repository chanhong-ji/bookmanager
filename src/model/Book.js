import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: Number,
  title: { type: String, required: true, trim: true, maxLength: 80 },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
