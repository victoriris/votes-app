import { inputObjectType } from "nexus";

export const BoardWhereUniqueInput = inputObjectType({
    name: "BoardWhereUniqueInput",
    definition(t) {
        t.nonNull.id("id")
    }
})

export const CreateBoardInput = inputObjectType({
    name: "CreateBoardInput",
    definition(t) {
        t.nonNull.string("name")
        t.nonNull.string("description");
    }
})

export const AddBoardItemInput = inputObjectType({
    name: "AddBoardItemInput",
    definition(t) {
        t.nonNull.string("content")
    }
})

export const VoteItemInput = inputObjectType({
    name: "VoteItemInput",
    definition(t) {
        t.nonNull.id("itemId")
    }
})
