import express from "express";

const apiRouter = express.Router();

apiRouter.get("/check", (req, res) => {
  res.json({ message: "message from server" });
});

export default apiRouter;
