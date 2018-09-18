const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String
  },
  credits: {
    type: Number,
    default: 0
  }
});

// When using Mocha for testing avoid exporting the model
mongoose.model("users", userSchema);
