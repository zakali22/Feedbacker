const mongoose = require("mongoose");
const { Schema } = mongoose;
const Recipient = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [Recipient],
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dateSent: Date
});

mongoose.model("surveys", surveySchema); // Must be set to plural
