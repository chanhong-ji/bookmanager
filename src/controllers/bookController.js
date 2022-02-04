import User from "../model/User";

export const getShelves = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  return res.send(user.shelves);
};
