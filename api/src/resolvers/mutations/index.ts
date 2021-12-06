import { UserInputError } from "apollo-server-errors";
import bcrypt from "bcryptjs";
import { mutationField, nonNull, nullable } from "nexus";
import {
	Board,
	BoardWhereUniqueInput,
	CreateBoardInput,
	CreateBoardItemInput,
	Item,
	ItemWhereUniqueInput,
	LoginInput,
	SignupInput, User, Vote
} from "..";
import { createTokens, getRefreshCookie, removeRefreshCookie } from "../../utils/auth";
import { AuthPayload } from "../payloads";

export const createBoard = mutationField("createBoard", {
	type: nullable(Board),
	args: {
		input: nonNull(CreateBoardInput),
	},
	resolve: async (_root, args, ctx) => {
		return ctx.prisma.board.create({
			data: {
				...args.input,
			},
		});
	},
});

export const createBoardItem = mutationField("createBoardItem", {
	type: nullable(Item),
	args: {
		input: nonNull(CreateBoardItemInput),
		where: nonNull(BoardWhereUniqueInput),
	},
	resolve: async (_root, args, ctx) => {
		return ctx.prisma.item.create({
			data: {
				...args.input,
				boardId: args.where.id,
			},
		});
	},
});

export const removeBoardItem = mutationField("removeBoardItem", {
	type: nullable(Item),
	args: {
		where: nonNull(ItemWhereUniqueInput),
	},
	resolve: async (_root, args, ctx) => {
		return ctx.prisma.item.delete({
			where: args.where,
		});
	},
});

export const voteItem = mutationField("voteItem", {
	type: nullable(Vote),
	args: {
		where: nonNull(ItemWhereUniqueInput),
	},
	resolve: async (_root, args, ctx) => {
		return ctx.prisma.vote.create({
			data: {
				user: {
					create: {
						firstname: "erlgkjherghergiu",
						lastname: "kdhjgiergubue",
						email: new Date().toString(),
						password: "gegehg",
					},
				},
				item: {
					connect: {
						id: args.where.id,
					},
				},
			},
		});
	},
});

export const signup = mutationField("signup", {
	type: nonNull(AuthPayload),
	args: {
		input: nonNull(SignupInput),
	},
	resolve: async (_root, args, ctx) => {
		const user = await ctx.prisma.user.create({
			data: {
				...args.input,
				email: args.input.email.toLowerCase(),
				password: await bcrypt.hash(args.input.password, 10),
			},
		});

		const { accessToken } = await createTokens({ userId: user.id }, ctx);

		return {
			user,
			accessToken,
		};
	},
});

export const login = mutationField("login", {
	type: nonNull(AuthPayload),
	args: {
		input: nonNull(LoginInput),
	},
	resolve: async (_root, args, ctx) => {
		const user = await ctx.prisma.user.findFirst({
			where: {
				email: args.input.email,
			},
			rejectOnNotFound: () => new UserInputError("Invalid User"),
		});

		const matches = await bcrypt.compare(args.input.password, user.password);
		if (!matches) {
			throw new UserInputError("Invalid credentials");
		}

		const { accessToken } = await createTokens({ userId: user.id }, ctx);

		return {
			user,
			accessToken,
		};
	},
});

export const refreshAuth = mutationField("refreshAuth", {
	type: nonNull(AuthPayload),
	resolve: async (_root, _args, ctx) => {

		const refreshCookie = getRefreshCookie(ctx)
		if (!refreshCookie) throw new Error("Invalid cookie");

		const user = await ctx.prisma.user.findFirst({
			where: {
				id: refreshCookie.userId,
			}
		})
		if (!user) throw new UserInputError("Invalid user");

		const { accessToken } = await createTokens(
			{ userId: user.id },
			ctx
		);

		return {
			user: user,
			accessToken,
		};
	},
});

export const logout = mutationField("logout", {
	type: nonNull(User),
	resolve: async (_root, _args, ctx) => {

		const refreshCookie = getRefreshCookie(ctx)
		if (!refreshCookie) throw new Error("Invalid cookie");
		
		removeRefreshCookie(ctx)

		return await ctx.prisma.user.findFirst({
			where: {
				id: refreshCookie.userId,
			},
			rejectOnNotFound: true
		})
	},
});
