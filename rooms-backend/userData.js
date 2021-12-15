import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  groups: [String],
});

export default mongoose.model("userdata", userDataSchema);
