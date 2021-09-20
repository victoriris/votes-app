import { list, queryField, nonNull, nullable } from "nexus";

export const boards = queryField("boards", {
    type: list(nonNull("Board")),
    resolve: async(root, args, ctx) => {
        return []
    }
})

export const board = queryField("board", {
    type: nullable("Board"),
    resolve: async(root, args, ctx) => {
        return null
    }
})
