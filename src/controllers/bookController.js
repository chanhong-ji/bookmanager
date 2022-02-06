import Book from "../model/Book";
import User from "../model/User";

export const getShelves = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  return res.send(user.shelves);
};

export const postBook = async (req, res) => {
  const { isbn, title } = req.body;
  const user = await User.findById(req.session.user._id).populate("shelves");
  if (user.shelves.find((book) => book.isbn === +isbn) === undefined) {
    try {
      const book = await Book.create({
        isbn,
        title,
        owner: req.session.user._id,
      });
      await user.shelves.push(book);
      user.save();
      return res.send({ type: true });
    } catch (error) {
      console.log("Book upload error: ", error);
      return res.send({ type: false, message: "Server error" });
    }
  } else {
    return res.send({ type: false, message: "Already in your Book shelves" });
  }
};
