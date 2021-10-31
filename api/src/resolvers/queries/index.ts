import { list, nonNull, nullable, queryField } from "nexus";
import { Board, BoardWhereUniqueInput } from "..";

export const boards = queryField("boards", {
	type: nonNull(list(nonNull(Board))),
	resolve: async (_root, _args, ctx) => {
		return ctx.prisma.board.findMany({});
	},
});

export const board = queryField("board", {
	type: nullable(Board),
    args: {
        where: nonNull(BoardWhereUniqueInput)
    },
	resolve: async (_root, args, ctx) => {
		return ctx.prisma.board.findUnique({
            where: {
                id: args.where.id
            }
        });
	},
});
