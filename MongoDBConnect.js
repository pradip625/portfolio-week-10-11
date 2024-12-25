const mongoose = require("mongoose");

// MongoDB connection string
const MONGO_URI = "mongodb://127.0.0.1:27017/BooksData"; // Use 127.0.0.1 for better compatibility

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
    console.log("Current version of Mongoose installed:", mongoose.version);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Export the connection object for reuse
module.exports = mongoose.connection;
