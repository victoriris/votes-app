import { objectType } from "nexus";
import { Vote } from "./Vote";


export const Item = objectType({
	name: "Item",
	definition(t) {
		t.nonNull.id("id");
		t.nonNull.string("content");
		t.nonNull.list.nonNull.field("votes", {
			type: Vote
		});
	},
});
