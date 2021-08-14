const express = require("express");
const path = require("path");

//? constants
const port = process.env.PORT || 3000;
const app = express();
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views/");
const partials_Path = path.join(__dirname, "../templates/partials/");

//? hbs 

app.set("view engine", "hbs");
app.set("views", template_path);


app.get("/", (req, res) => {
    res.render("index")
})

//? listening to the server

app.listen(port, () => {
    console.log("listening at ", port);
});
