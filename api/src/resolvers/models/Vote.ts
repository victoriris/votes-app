import { objectType } from "nexus";
import { Item } from "./Item";
import { User } from "./User";

export const Vote = objectType({
	name: "Vote",
	definition(t) {
		t.nonNull.id("itemId");
		t.nonNull.id("userId");
		t.nullable.field("user", {
			type: User,
			resolve: async(root, _, ctx) => {
				return ctx.prisma.vote.findUnique({
					where: {
						itemId_userId: {
							itemId: root.itemId,
							userId: root.userId
						}
					}
				}).user()
			}
		});
		t.nullable.field("item", {
			type: Item,
			resolve: async(root, _, ctx) => {
				return ctx.prisma.vote.findUnique({
					where: {
						itemId_userId: {
							itemId: root.itemId,
							userId: root.userId
						}
					}
				}).item()
			}
		});
	},
});
