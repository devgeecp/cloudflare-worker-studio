import type { Context } from "hono";
import { choosePrismaConnection } from "../../../lib/utils/prismaConnection"

export default async function getCategories(c: Context) {

	const prisma = await choosePrismaConnection(c);

	try {
		const categories = await prisma.category.findMany({});
		return (c.json(categories));
	} catch (e) {
		return (c.json({message: (e as Error).message}, 500))
	}
}
