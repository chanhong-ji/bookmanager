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
  const user = await User.findById(req.session.user._id).populate({
    path: "shelves",
    populate: {
      path: "books",
    },
  });
  outer: for (let shelve of user.shelves) {
    for (let book of shelve.books) {
      if (book.isbn === +isbn) {
        break outer;
      }
    }
    const newShelve = user.shelves.pop((shelve) => shelve.category === "new");
    newShelve.books.push({ isbn, title, imgUrl, details: [] });
    user.shelves.push(newShelve);
    user.save();
    return res.send({ type: 1, shelves: user.shelves });
  }
  return res.send({ type: 0 });
};
