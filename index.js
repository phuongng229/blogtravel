import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {active: 'home'});
});

app.get("/createpost", (req, res) => {
    res.render("create.ejs", {active: 'createpost'});
});

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
});