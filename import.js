const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact");
const Job = require("./models/Job");

// Connect MongoDB
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
}

// Read CSV
function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

async function importData() {
  try {
    await connectDB();

    // Read CSV files
    const contacts = await readCSV("./data/contacts.csv");
    const jobs = await readCSV("./data/jobs.csv");

    // Transform Contacts
    const contactData = contacts.map((contact) => ({
      contactId: Number(contact.id),
      name: `${contact.f_name} ${contact.l_name}`,
      company: contact.company,
      email: contact.email,
    }));

    // Transform Jobs
    const jobData = jobs.map((job) => ({
      jobId: Number(job.id),
      jobName: job.name,
      contactId: Number(job.contact_id),
      address: `${job.address1}, ${job.address2}`,
    }));

    // Remove old data
    await Contact.deleteMany({});
    await Job.deleteMany({});

    // Insert new data
    await Contact.insertMany(contactData);
    await Job.insertMany(jobData);

    console.log("Contacts Imported:", contactData.length);
    console.log("Jobs Imported:", jobData.length);

    await mongoose.connection.close();
    console.log("MongoDB Connection Closed");
  } catch (err) {
    console.error(err);
  }
}

importData();