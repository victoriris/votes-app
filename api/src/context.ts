import { PrismaClient, User } from "@prisma/client";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Request, Response } from "express";
import { prisma } from "./clients";
import { getUserId } from "./utils/auth";

export interface Context {
	request: Request;
	response: Response;
	prisma: PrismaClient;
	user: User | null
}

export async function createContext(
	request: ExpressContext
): Promise<Partial<Context>> {
	const context: Context = {
		...request,
		response: request.res,
		request: request.req,
		prisma: prisma,
		user: null,
	};

	const userId = getUserId(context)

	if (userId) {
		const user = await prisma.user.findFirst({
			where: {
				id: userId
			},
			rejectOnNotFound: true
		})
		context.user = user
	}
	
	return context
}
