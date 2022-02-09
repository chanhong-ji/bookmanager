import Book from "../model/Detail";
import User from "../model/User";

export const getShelves = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  return res.send(user.shelves);
};

export const postShelves = async (req, res) => {
  const shelves = req.body;
  await User.findByIdAndUpdate(req.session.user._id, {
    shelves,
  });
};

export const postBook = async (req, res) => {
  const { isbn, title, imgUrl } = req.body;
  const user = await User.findById(req.session.user._id).populate("shelves");
  if (user.shelves.find((book) => book.isbn === +isbn) === undefined) {
    user.shelves.push({ isbn, title, imgUrl });
    user.save();
    return res.send({ type: true });
  } else {
    return res.send({ type: false, message: "Already in your Book shelves" });
  }
};
