import { mutationField, nonNull } from "nexus";
import { BoardWhereUniqueInput, CreateBoardInput, AddBoardItemInput, VoteItemInput } from "../inputs";

export const createBoard = mutationField("createBoard", {
	type: nonNull("Board"),
	args: {
		input: nonNull(CreateBoardInput),
	},
	resolve: async (_, args, ctx) => {
		return ctx.prisma.board.create({
			data: args.input,
		});
	},
});

export const addBoardItem = mutationField("addBoardItem", {
	type: nonNull("Item"),
	args: {
		input: nonNull(AddBoardItemInput),
		where: nonNull(BoardWhereUniqueInput)
	},
	resolve: async (_, args, ctx) => {
		return ctx.prisma.item.create({
			data: {
				...args.input,
				boardId: args.where.id
			},
		});
	},
});

export const removeBoardItem = mutationField("removeBoardItem", {
	type: nonNull("Item"),
	args: {
		where: nonNull(BoardWhereUniqueInput),
	},
	resolve: async (_, args, ctx) => {
		return ctx.prisma.item.delete({
			where: args.where,
		});
	},
});

export const voteItem = mutationField("voteItem", {
	type: nonNull("Vote"),
	args: {
		input: nonNull(VoteItemInput),
	},
	resolve: async (_, args, ctx) => {
		return ctx.prisma.vote.create({
			data: {
                item: {
                    connect: {
                        id: args.input.itemId
                    }
                },
                user: {
                    create: {
                        firstName: "test",
                        lastName: "user",
                        email: new Date().toString(),
                        password: "",
                    }
                }
            }
		});
	},
});
