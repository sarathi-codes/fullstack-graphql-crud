require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true // in order to use Graphical Tool in localhost:{port}/graphql
}));

app.listen(4000, () => {
  console.log("Server Running Successfully on Port", PORT);
});
