const express = require("express");
const getDate = require("./date");
const date = require(__dirname + "/date.js");

const app = express();
const PORT = process.env.PORT || 3000;

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

// using body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// using static files
app.use(express.static("public"));

// using ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const day = getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work ToDo List", newListItems: workItems });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/", (req, res) => {
  let item = req.body.newItem;

  if (req.body.list == "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
