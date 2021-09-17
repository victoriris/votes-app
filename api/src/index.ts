import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

type ApolloConfig = ApolloServerExpressConfig;

async function startApolloServer(
	typeDefs: ApolloConfig["typeDefs"],
	resolvers: ApolloConfig["resolvers"]
) {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	await server.start();
	server.applyMiddleware({ app });
	await new Promise<void>((resolve) => {
        httpServer.listen({ port: 4000 })
        resolve()
    });
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

// Start server
startApolloServer(undefined, undefined)