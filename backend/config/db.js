const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB".green);
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err.message}`.red);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected".yellow);
});

module.exports = connectDB;
