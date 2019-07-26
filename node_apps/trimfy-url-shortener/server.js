const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

app.use(express.json());

app.use(express.static("client/dist"));

// Define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
