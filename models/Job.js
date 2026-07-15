const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobId: Number,
  jobName: String,
  contactId: Number,
  address: String,
},
{
    versionKey: false,
}
);

module.exports = mongoose.model("Job", jobSchema);