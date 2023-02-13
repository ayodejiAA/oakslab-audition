import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";

import { StagesResolver, TasksResolver } from "./resolvers/";

const PORT = process.env.PORT || 4000;

async function main() {
  const schema = await buildSchema({
    resolvers: [StagesResolver, TasksResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

main();
