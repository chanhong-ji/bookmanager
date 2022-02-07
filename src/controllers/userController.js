import User from "../model/User";
import bcrypt from "bcrypt";

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.send({ success: false, message: "Email does not exist" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.send({ success: false, message: "Wrong password" });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.send({ success: true });
};

export const postJoin = async (req, res) => {
  const { email, username, password, password2 } = req.body;
  if (password !== password2) {
    return res.send({
      success: false,
      message: "Password comfirmation does not match",
    });
  }

  const exists = await User.exists({ email });
  if (exists) {
    return res.send({ success: false, message: "This Email is already taken" });
  }

  try {
    await User.create({
      email,
      username,
      password,
      categories: ["new"],
    });
    return res.send({ success: true });
  } catch (error) {
    console.log("postLogin error:");
    console.log(error);
    return res.send({ success: false, message: "Server Error" });
  }
};

export const getLogout = (req, res) => {
  req.session.destroy();
  return;
};

export const getSession = (req, res) => {
  return res.send({ loggedIn: req.session.loggedIn, user: req.session.user });
};
