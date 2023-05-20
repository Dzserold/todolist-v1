const express = require('express')
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
const app = express()
const port = 3000

app.set('view engine', 'ejs');
// Apply body parser so it can recive post request from the page
app.use(bodyParser.urlencoded({ extended: true }))
// apply styles and other resoursec on the website
app.use(express.static("public"))

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const items = ["Buy food", "Get food", "Eat food"]
let workItems = []

app.get('/', (req, res) => {
  let day = date.getDate()

  res.render("list", { listTitle: day, newListItems: items })
})

app.post("/", (req, res) => {
  let item = req.body.newItem

  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  }
  else {
    items.push(item)
    res.redirect("/")
  }
})

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems })
})

app.post("work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item)
  res.redirect("/work")
})

app.get("/about", (req, res) => {
  res.render("about")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})