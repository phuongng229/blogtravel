import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 3000;
const posts = [];
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
})

const upload = multer({storage});

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", { active: "home", posts});
});

app.get("/createpost", (req, res) => {
  res.render("create.ejs", { active: "createpost" });
});

app.post("/submit", upload.single("image"), (req, res) => {
 posts.push({
    id: Date.now(),
    image: "/uploads/" + req.file.filename,
    author: req.body.name,
    title: req.body.title,
 });

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
