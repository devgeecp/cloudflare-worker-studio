import type { Context } from "hono";
import { prismaConnection } from "../../../lib/utils/prismaConnection"

export default async function getCategories(c: Context) {

	const prisma = prismaConnection(c);

	try {
		const categories = await prisma.category.findMany({});
		return (c.json(categories));
	} catch (e) {
		return (c.json({message: (e as Error).message}, 500))
	}
}
