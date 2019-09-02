import express from "express";
import { graphql } from "graphql";
import bodyParser from 'body-parser';
import schema from "./schema";

const app = express().use(bodyParser.json());

app.all("/graphql", async (req, res) => {
  const { query, variables, operationName } = req.body;
  const result = await graphql(
    schema,
    query,
    {},
    {},
    variables,
    operationName
  );

  return res.send(result);
})

export { app };
