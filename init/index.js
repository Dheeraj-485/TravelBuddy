require("dotenv").config();

const mongoose = require("mongoose");

const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany();
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "661bb917dc4bd6053b114342",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
    console.log(initData.data);
  } catch (err) {
    console.log("Error in processing data", err);
  }
};

initDB();
