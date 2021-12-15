import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  groupname: String,
  message: String,
  username: String,
  timestamp: String,
});

export default mongoose.model("msgdata", messageSchema);
