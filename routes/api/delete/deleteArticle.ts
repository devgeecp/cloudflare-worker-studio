import type { Context } from "hono";
import { prismaConnection } from "../../../lib/utils/prismaConnection"

export default async function deleteArticle(c: Context) {

	const idQuery = c.req.param('id');

	try {
		if (!idQuery)
			throw Error("Invalid uri")

		const id = Number(idQuery);

		//Prevent malicious ids
		if (isNaN(id) || id < 0 || id > 999999)
			throw Error("Invalid post id");

		const prisma = prismaConnection(c);
		const ret = await prisma.post.delete({where: {id: id}});
		
		if (!ret)
			throw Error("Qualcosa è andato storto");

		return c.text(`Post ${id} deleted`)
	} catch (e) {
		if ((e as Error).message.search("No record was found for a delete") > 0)
			(e as Error).message = "Record not found";
		return c.json({message: `Error: ${(e as Error).message}`}, 500)	
	}
}
