const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Books = require("./booksSchema");
const mongodbConnected= require("./MongoDBConnect");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

console.log("Books Model Loaded:", Books);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Books API");
});

app.get("/about", async (req, res) => {
  try {
    const count = await Books.countDocuments().exec();
    console.log("Total documents count before addition:", count);
    res.send(
      "MongoDB Express React and Mongoose app. React runs in another application."
    );
  } catch (err) {
    console.error("Error fetching document count:", err);
    res.status(500).send("Error fetching document count");
  }
});

app.get("/allbooks", async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Error fetching books");
  }
});

app.get("/getbook/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Books.findById(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).send("Error fetching book");
  }
});

app.post("/addbooks", async (req, res) => {
  try {
    const newBook = new Books(req.body);
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", newBook });
  } catch (err) {
    console.error("Error adding new book:", err);
    res.status(400).send("Adding new book failed");
  }
});

app.put("/updatebook/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;

  try {
    const book = await Books.findByIdAndUpdate(id, updatedBook, { new: true });
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book");
  }
});

app.delete("/deleteBook/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).send("Book deleted successfully");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Error deleting book");
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
