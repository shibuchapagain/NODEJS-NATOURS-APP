const fs = require("fs");
require("./config");
const Tour = require("./models/tourModel");
const tours = JSON.parse(
  fs.readFileSync("./dev-data/data/tours-simple.json", "utf-8")
);
// console.log(tours); // comes all data from file

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// testing
// console.log(process.argv);

// DELETE ALL DATA FROM DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Delete data successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// FOR EXECUTE THE CODE USING COMMAND LINE
if (process.argv[2] == "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  deleteData();
}
