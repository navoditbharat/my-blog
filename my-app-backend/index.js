import express from "express";

const blogData = [
  { name: "learn-react", upvotes: 0, comments: [] },
  { name: "learn-node", upvotes: 0, comments: [] },
  { name: "mongodb", upvotes: 0, comments: [] },
];

const port = 3001;
const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  res.send({ "This is name": name, "This is password": password });
});

app.post("signup", (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  res.send({ firstName, lastName, password, email });
});

app.post("/blogs/:name/upvote", (req, res) => {
  const { name } = req.params;
  let article;
  blogData.forEach((blog) => {
    if (blog.name === name) {
      blog.upvotes += 1;
      article = blog;
    }
  });
  if (article) res.send(article);
  else {
    res.status(404);
    res.send(`Unable to find a article named ${name}`);
  }
});

app.post("/blogs/:name/comment", (req, res) => {
  const { name } = req.params;
  const { newComment } = req.body;

  if (!newComment) {
    res.status(404);
    res.send("Cannot add empty comment");
  } else {
    let article;
    blogData.forEach((blog) => {
      if (blog.name === name) {
        blog.comments.push(newComment);
        article = blog;
      }
    });
    if (article) res.send(article);
    else {
      res.status(404);
      res.send(`Unable to find a article named ${name}`);
    }
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
