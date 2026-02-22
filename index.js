import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 3000;
let posts = [];
let isEdit = false;
let isDeleteClicked = false;



app.use(express.static("public"));

posts.push({
  id: 1,
  date: "2025-05-23",
  image: "/images/test1.jpg",
  author: "Andrew Lee",
  title: "Travelling to New Zealand",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
});

posts.push({
  id: 2,
  date: "2025-05-27",
  image: "/images/test2.jpg",
  author: "Ben Nguyen",
  title: "My Best Journey",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
});

posts.push({
  id: 3,
  //   date needs to be in the right format
  date: "2025-05-30",
  image: "/images/test3.jpg",
  author: "Thanh Nguyen",
  title: "Love Christchurch",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { active: "home", posts });
  console.log(Date.now());
});

app.get("/createpost", (req, res) => {
  res.render("create.ejs", { active: "createpost", isEdit: false });
});

app.get("/view/:id", (req, res) => {
  const postID = Number(req.params.id);
  //   using find method to find which element id object has the same value as postID from request
  let post = posts.find((p) => p.id === postID);

  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("view.ejs", {
    active: "",
    title: post.title,
    authorName: post.author,
    date: post.date,
    imageLink: post.image,
    content: post.content,
    id: post.id,
    isDeleteClicked: false,
    isEdit: false,
    
  });
});

app.get("/createpost/:id", (req, res) => {
  const postID = Number(req.params.id);
  let post = posts.find((p) => p.id === postID);

  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("create.ejs", {
    active: "createpost",
    post,
    isEdit: true,
    id: post.id,
  });
});

app.post("/submit", upload.single("image"), (req, res) => {
  // const dateWritten = new Date();
  // date = dateWritten.getDate();
  posts.push({
    id: Date.now(),
    date: req.body.date,
    image: "/uploads/" + req.file.filename,
    author: req.body.name,
    title: req.body.title,
    content: req.body.content,
  });

  res.redirect("/");
});

app.post("/update/:id", upload.single("image"), (req, res) => {
  const postID = Number(req.params.id);
  let post = posts.find((p) => p.id === postID);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  if (req.file) {
    let newImage = "/uploads/" + req.file.filename;
    post.image = newImage;
  }

  post.date = req.body.date;
  post.author = req.body.name;
  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect("/view/" + post.id);
});

app.get("/delete/:id", (req, res) => {
  const postID = Number(req.params.id);
  let post = posts.find((p) => p.id === postID);
  

  
  res.render("view.ejs", {
    active: "",
    title: post.title,
    authorName: post.author,
    date: post.date,
    imageLink: post.image,
    content: post.content,
    id: post.id,
    isDeleteClicked: true,
    isEdit: false,
    
    
  });
});

app.post("/delete/:id", (req, res) => {
  const postID = Number(req.params.id);
  let post = posts.find((p) => p.id === postID);
  //Create a new array which contains p.id !== postID only

  posts = posts.filter((p) => p.id !== postID);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
