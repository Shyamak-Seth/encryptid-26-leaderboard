require("dotenv").config();

const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  PORT = process.env.PORT || 5000,
  User = require("./schemas/userSchema");

mongoose.connect(process.env.MONGO_URI, console.log("MONGODB CONNECTED"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const allUsers = await User.find().select("-logs").sort({
    points: "desc",
    lastAnswered: "asc",
  });
  res.render("leaderboard", { allUsers: allUsers });
});

app.listen(PORT, console.log(`Leaderboard listening on port ${PORT}`));
