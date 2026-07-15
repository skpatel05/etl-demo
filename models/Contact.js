const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  contactId: Number,
  name: String,
  company: String,
  email: String,
},
{
    versionKey: false,
}
);

module.exports = mongoose.model("Contact", contactSchema);