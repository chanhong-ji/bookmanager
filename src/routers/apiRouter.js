import express from "express";
import { getShelves, postBook } from "../controllers/bookController";
import {
  getLogout,
  getSession,
  postJoin,
  postLogin,
} from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.get("/check", (req, res) => {
  res.json({ message: "message from server" });
});

apiRouter.post("/login", postLogin);
apiRouter.post("/join", postJoin);
apiRouter.get("/logout", getLogout);
apiRouter.get("/session", getSession);
apiRouter.get("/shelves", getShelves);
apiRouter.post("/book", postBook);

export default apiRouter;
