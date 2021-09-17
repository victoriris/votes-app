import { objectType } from "nexus";
import { Item } from "./Item";
import { User } from "./User";


export const Vote = objectType({
	name: "Vote",
	definition(t) {
		t.nonNull.id("itemId");
		t.nonNull.id("userId");
		t.nonNull.field("user", {
			type: User,
		});
		t.nonNull.field("item", {
			type: Item,
		});
	},
});
