import type { Context } from "hono";
import { prismaConnection } from "../../../lib/utils/prismaConnection";
import { parseGFEntry } from "./utils/sync-documents-wp-utils";
import { PrismaClient } from "../../../generated/prisma/client";



async function getDocumentsFromWp (_c: Context, prisma: PrismaClient) {

	//auth string encoded in base64; required to authenticate in wordpress REST api
	const auth =  _c.env.WP_AUTH || "";
	const encodedAuth = btoa(auth);
	let chunkEntries: any[] = [];
	let allEntries: any[] = [];

	let data: Response;
	let count = 1;
			do {
				data = await fetch(`https://www.difendimi.com/wp-json/gf/v2/entries?paging[current_page]=${count}&paging[page_size]=30&_labels=1`, {
					headers: {
						"Authorization": `Basic ${encodedAuth}`,
						"Content-Type": "application/json"
					},

				});

				if (data.ok) {
					let entriesObject = await data.json() as any;
					chunkEntries = entriesObject["entries"];
					//const chunkParsedEntries: GFEntryType[] =

					//reduce method used as a map function that can skip null elements
					chunkEntries.forEach(async (element: any) => {
						const res = await parseGFEntry(element, prisma);
						if (res)
							allEntries.push(res);
					})


				}

				console.log(allEntries.length);
				count++;
			} while (chunkEntries[0]);

		console.log(allEntries);
		return allEntries;
}

const syncDocumentsWP = async (_c: Context) => {
	try {
		const prisma = prismaConnection(_c);

		const users = prisma.user.findMany({});


		const documents = await getDocumentsFromWp(_c, prisma);

		//documents.forEach((el, i) => {i < 10 && console.log(el)});

		//sync posts
		//await prisma.post.upsert({
		//	data: {
		//		...body.article,
		//		categories: {
		//			create: categoriesConnection
		//		}
		//	}
		//});

		return _c.json({message: "ok"}, 200);
		//Error handling
	} catch (e) {
		return _c.json({message: `Error: ${(e as Error).message}`}, 500);
	}

}

export default syncDocumentsWP;
