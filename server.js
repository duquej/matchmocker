const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/google", (req, res) => {
  console.log("Google auth called.");
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
