import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { schema } from "./schema";
import {
	ApolloServerPluginLandingPageGraphQLPlayground
  } from "apollo-server-core";

async function startApolloServer() {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageGraphQLPlayground()
		],
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
startApolloServer()