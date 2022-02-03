import express from "express";
import { postJoin, postLogin } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.get("/check", (req, res) => {
  res.json({ message: "message from server" });
});

apiRouter.post("/login", postLogin);
apiRouter.post("/join", postJoin);

export default apiRouter;
