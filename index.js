import "dotenv/config";
import express from "express";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use(morgan("dev"));
app.use("/api/check", (req, res, next) => {
  res.json({ message: "message from server" });
  next();
});
app.use(express.static(path.join(__dirname, "react-project/build")));

// Route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "react-project/build/index.html"));
});

app.listen(PORT, () => console.log(`Server on ${PORT}`));
