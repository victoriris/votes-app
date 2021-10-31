import { mutationField, nonNull, nullable } from "nexus";
import { Board, BoardWhereUniqueInput, CreateBoardInput, CreateBoardItemInput, Item, ItemWhereUniqueInput, Vote } from "..";

export const createBoard = mutationField("createBoard", {
    type: nullable(Board),
    args: {
        input: nonNull(CreateBoardInput)
    },
    resolve: async (_root, args, ctx) => {
        return ctx.prisma.board.create({
            data: {
                ...args.input
            }
        })
    }
})

export const createBoardItem = mutationField("createBoardItem", {
    type: nullable(Item),
    args: {
        input: nonNull(CreateBoardItemInput),
        where: nonNull(BoardWhereUniqueInput)
    },
    resolve: async (_root, args, ctx) => {
        return ctx.prisma.item.create({
            data: {
                ...args.input,
                boardId: args.where.id
            }
        })
    }
})

export const removeBoardItem = mutationField("removeBoardItem", {
    type: nullable(Item),
    args: {
        where: nonNull(ItemWhereUniqueInput)
    },
    resolve: async (_root, args, ctx) => {
        return ctx.prisma.item.delete({
            where: args.where
        })
    }
})

export const voteItem = mutationField("voteItem", {
    type: nullable(Vote),
    args: {
        where: nonNull(ItemWhereUniqueInput)
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
                    }
                },
                item: {
                    connect: {
                        id: args.where.id
                    }
                },
            }
        })
    }
})