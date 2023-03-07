import express from "express";

const port = 3001;

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
