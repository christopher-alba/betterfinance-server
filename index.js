const { ApolloServer, gql } = require("apollo-server");
const { resolve } = require("path");
const { readFileSync } = require("fs");
const { getPayload } = require("./util");
const { resolvers } = require("./graphql/resolvers");
require("./mongodb/connect");

const typeDefs = gql(
  readFileSync(resolve("./graphql/schema.graphql"), {
    encoding: "utf8",
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";
    // try to retrieve a user with the token
    const response = await getPayload(token);
    // add the user to the context
    return { user: response.payload, loggedIn: response?.loggedIn };
  },
});

// The `listen` method launches a web server.
server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
