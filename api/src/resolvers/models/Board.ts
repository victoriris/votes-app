import { objectType } from "nexus";
import { Item } from "./Item";

export const Board = objectType({
	name: "Board",
	definition(t) {
		t.nonNull.id("id");
		t.nonNull.string("name");
		t.nonNull.string("description");
		t.nonNull.list.nonNull.field("items", {
			type: Item,
			resolve: async(root, _, ctx) => {
				return ctx.prisma.board.findUnique({
					where: {
						id: root.id
					}
				}).items()
			}
		});
	},
});
