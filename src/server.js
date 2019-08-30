import express from "express";

const app = express();

app.all("/", (req, res) => {
  return res.send(`I am up`);
})

app.all("/graphql", (req, res, next) => {
  return res.send("I am graphql");
})

export { app };
