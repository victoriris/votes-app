import { inputObjectType } from "nexus";

export const BoardWhereUniqueInput = inputObjectType({
	name: "BoardWhereUniqueInput",
	definition(t) {
		t.nonNull.id("id");
	},
});

export const ItemWhereUniqueInput = inputObjectType({
	name: "ItemWhereUniqueInput",
	definition(t) {
		t.nonNull.id("id");
	},
});

export const CreateBoardItemInput = inputObjectType({
	name: "CreateBoardItemInput",
	definition(t) {
		t.nonNull.string("content");
	},
});

export const CreateBoardInput = inputObjectType({
	name: "CreateBoardInput",
	definition(t) {
		t.nonNull.string("name");
		t.nonNull.string("description");
	},
});
