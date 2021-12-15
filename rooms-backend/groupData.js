import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupDataSchema = new Schema({
  groupname: {
    type: String,
    unique: true,
  },
  users: [String],
});

export default mongoose.model("groupdata", groupDataSchema);
