const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
const { createWriteStream } = require("fs");
const cors = require("cors");

app.use(cors());

const typeDefs = gql`
  type Query {
    welcome: String
  }
  type Mutation {
    singleUpload(file: Upload): String
  }
`;

const saveImagesWithStream = ({ filename, mimetype, stream }) => {
  const path = `images/${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ path, filename, mimetype }))
      .on("error", reject)
  );
};
const resolvers = {
  Query: {
    welcome: () => "Hello",
  },
  Mutation: {
    singleUpload: async (_, args) => {
      const { filename, mimetype, createReadStream } = await args.file;
      const stream = createReadStream();
      await saveImagesWithStream({ filename, mimetype, stream });
      return "success";
    },
  },
};

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`http://localhost:4000${server.graphqlPath}`)
);
