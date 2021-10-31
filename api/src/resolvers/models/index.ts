import { objectType } from "nexus"

// User
export const User = objectType({
    name: "User",
    definition(t) {
        t.id("id");
        t.string("firstname")
        t.string("lastname")
    }
})

// Board
export const Board = objectType({
    name: "Board",
    definition(t) {
        t.id("id");
        t.string("name")
        t.string("description")
        t.nonNull.list.nonNull.field("items", {
            type: Item,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.board.findUnique({
                    where: {
                        id: root.id
                    },
                    rejectOnNotFound: true,
                }).items()
            }
        })
    }
})

// Item
export const Item = objectType({
    name: "Item",
    definition(t) {
        t.id("id");
        t.string("content")
        t.nonNull.list.nonNull.field("votes", {
            type: Vote,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.item.findUnique({
                    where: {
                        id: root.id
                    },
                    rejectOnNotFound: true,
                }).votes()
            }
        })
    }
})

// Vote
export const Vote = objectType({
    name: "Vote",
    definition(t) {
        t.id("itemId");
        t.id("userId");
        t.nonNull.field("item", {
            type: Item,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.item.findUnique({
                    where: {
                        id: root.itemId
                    },
                    rejectOnNotFound: true,
                })
            }
        })
        t.nonNull.field("user", {
            type: User,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.user.findUnique({
                    where: {
                        id: root.userId
                    },
                    rejectOnNotFound: true,
                })
            }
        })
    }
})