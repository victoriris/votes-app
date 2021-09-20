import { mutationField, nullable } from "nexus";

export const createBoard = mutationField("createBoard", {
    type: nullable("Board"),
    resolve: async(root, args, ctx) => {
        return null
    }
})

export const addBoardItem = mutationField("addBoardItem", {
    type: nullable("Item"),
    resolve: async(root, args, ctx) => {
        return null
    }
})

export const removeBoardItem = mutationField("removeBoardItem", {
    type: nullable("Item"),
    resolve: async(root, args, ctx) => {
        return null
    }
})

export const voteItem = mutationField("voteItem", {
    type: nullable("Vote"),
    resolve: async(root, args, ctx) => {
        return null
    }
})