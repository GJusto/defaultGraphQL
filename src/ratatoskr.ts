import dotenv from "dotenv";
import figlet from "figlet";
import lodash from "lodash";
import chalk from "chalk";

import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";
import { GraphQLSchema } from "graphql";
import service1 from "@services/service1";
import dependenciesContainer from "@/infrastructure/DI/dependencies-container";
import schema1 from "@schemas/schema1";
import resolver1 from "@resolvers/resolver1";

dotenv.config();

const buildSchema = () => {
  return buildSubgraphSchema([
    {
      typeDefs: gql`
        ${schema1}
      `,
      resolvers: lodash.merge(resolver1),
    },
  ]);
};

const buildServer = (schema: GraphQLSchema) => {
  return new ApolloServer({
    schema: schema,
    context: ({ req }) => ({
      service1: dependenciesContainer.service.service1.injectClass(service1),
      headers: req.headers,
    }),
    introspection: process.env.ENV_NAME != "PROD",
    debug: process.env.ENV_NAME != "PROD",
  });
};

const runServer = async () => {
  const schema = buildSchema();
  const server = buildServer(schema);
  const port = process.env.APOLLO_SERVER_PORT;

  server.listen({ port }).then(({ url }) => {
    console.log(`Server is now running on ${url}`);
    console.log(
      chalk.blueBright(
        figlet.textSync("Ratatoskr", {
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
      )
    );
  });
};

const main = async () => {
  runServer().then();
};

main().then();
