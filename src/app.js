const express = require("express");
const path = require("path");
require("./db/conn");
const Client = require("./models/Client");
const hbs = require("hbs");

//? constants
const port = process.env.PORT || 3000;
const app = express();
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views/");
const partials_Path = path.join(__dirname, "../templates/partials/");


//? setting of data
app.use(express.static(static_path));
app.use(express.json())
app.use(express.urlencoded({ extends: true }));


//? hbs 
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_Path);


//? routing
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/login", (req, res) => {
    res.render("login")
})


//? saving data in db

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if (password === confirmPassword) {
            const client=new Client({
                fullName: req.body.fullName,
                email: req.body.email,
                address: req.body.address,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword,
                gender:req.body.gender,
                age:req.body.age,
            })
            const result = await client.save()
            res.status(201).send("Client is inserted.");
        } else {
            res.send("password must match.")
        }
        console.log(req);
    } catch (err) {
        res.status(400).send(err)
    }
})

app.post("/login",async (req, res) => {
    try {
        const userEnteredEmail = req.body.email
        const userEnteredPassword = req.body.password
        const user =await Client.findOne({ email: userEnteredEmail })
        if (userEnteredPassword === user.password) {
            res.status(201).render("index");
        } else {
            res.send("Invalid Email or Password.")
        }
    } catch (err) {
        res.status(400).send("Invalid Email")
    }
})

//? listening to the server

app.listen(port, () => {
    console.log("listening at ", port);
});
