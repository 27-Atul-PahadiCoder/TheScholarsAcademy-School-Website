const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3000;

// Set up storage for media files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // The directory where uploaded files will go
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Simulating a media array as a database
let media = [
  {
    id: 1,
    type: "image",
    url: "/uploads/media1.jpg",
    description: "Old Image",
  },
];

// API to upload media
app.post("/api/upload-media", upload.single("file"), (req, res) => {
  const { type, description } = req.body;

  // Create a new media item
  const newMedia = {
    id: Date.now(),
    type,
    url: `/uploads/${req.file.filename}`,
    description,
  };

  // Add the new media to the list (this would typically be saved in a database)
  media.push(newMedia);

  res.status(200).json(media);
});

// API to fetch all media
app.get("/api/media", (req, res) => {
  res.json(media);
});

// Serve static files (static images in /public folder)
app.use("/static", express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
