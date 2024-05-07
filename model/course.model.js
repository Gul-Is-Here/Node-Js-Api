const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  time_slot: {
    type: String,
    required: true,
  },
  other_properties: {
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
