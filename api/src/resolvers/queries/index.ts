import { list, nonNull, queryField } from "nexus";
import { BoardWhereUniqueInput } from "../inputs";

export const boards = queryField("boards", {
    type: nonNull(list(nonNull("Board"))),
    resolve: async(_root, _args, ctx) => {
        return ctx.prisma.board.findMany()
    }
});

export const board = queryField("board", {
    type: nonNull("Board"),
    args: {
        where: nonNull(BoardWhereUniqueInput)
    },
    resolve: async(_root, args, ctx) => {
        return ctx.prisma.board.findFirst({
            where: args.where,
            rejectOnNotFound: true,
        })
    }
});
