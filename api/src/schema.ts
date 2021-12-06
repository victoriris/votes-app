import { applyMiddleware } from "graphql-middleware";
import { declarativeWrappingPlugin, makeSchema } from "nexus";
import path from "path";
import permissions from "./permissions";
import * as types from "./resolvers";

export const schema = applyMiddleware(
	makeSchema({
		types,
		plugins: [declarativeWrappingPlugin({ disable: true })],
		outputs: {
			schema: path.join(__dirname, "../schema.graphql"),
			typegen: path.join(__dirname, "schema-typegen.ts"),
		},
		contextType: {
			module: require.resolve("./context"),
			alias: "Context",
			export: "Context",
		},
		nonNullDefaults: {
			output: true,
		},
	}),
	permissions
);
