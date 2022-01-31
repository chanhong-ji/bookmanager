import express from "express";
import morgan from "morgan";
import path from "path";

const app = express();

const PORT = process.env.PORT || 5000;

const onListening = () => console.log(`Server on ${PORT}`);

app.use(morgan("dev"));
app.use("/api/check", (req, res, next) => {
  res.json({ message: "message from server" });
  next();
});
app.use(express.static(path.join(__dirname, "react-project/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "react-project/build/index.html"));
});

app.listen(PORT, onListening);
