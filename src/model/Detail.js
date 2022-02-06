import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
  table: { type: String, required: true },
  text: { type: String },
});

const Detail = mongoose.model("Detail", detailSchema);

export default Detail;
