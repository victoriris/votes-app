import { inputObjectType } from "nexus";

export const BoardWhereUniqueInput = inputObjectType({
    name: "BoardWhereUniqueInput",
    definition(t) {
        t.nonNull.id("id")
    }
})