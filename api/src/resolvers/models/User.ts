import { objectType } from "nexus";

export const User = objectType({
	name: "User",
	definition(t) {
		t.nonNull.id("id");
		t.nonNull.string("firstName");
		t.nonNull.string("lastName");
		t.nonNull.string("email");
		t.nonNull.string("password");
	},
});
