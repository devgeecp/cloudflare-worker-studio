import type { Context } from "hono";
import { prismaConnection } from "../../../lib/utils/prismaConnection";

export default async function getArticles(c: Context) {
	const param = c.req.param();
	const query = c.req.query();

	let categoriesId: number[] | undefined;
	let tags: string[] | undefined;
	let per_page: number | undefined;
	let page = 1;

	if (query.categories)
		categoriesId = query.categories.split(',').map((i) => Number(i));
	if (query.tags)
		tags = query.tags.split(',');
	if (query.per_page)
		per_page = Number(query.per_page);
	if (query.page)
		page = Number(query.page);

	const idOrSlug = param["id-slug"];
	const prisma = prismaConnection(c);

	try {
		/** Get all articles, filters them if query is present, possibles queries
		*		categories=1,2,3
		*		tags=amianto,frisani
		*		per_page=10 (number of entries)
		*		page=2 ()
		* */
		if (!idOrSlug) {
			//call prisma post findMany for every category passed by query
			//return promises of article types due to async in map
			if (categoriesId && isNaN(Number(categoriesId[categoriesId.length - 1])))
				throw Error("Invalid Category");

			const categoriesMapping = categoriesId ? categoriesId.map((id) => ({categoryId: id})) : [{categoryId: undefined}]
			const categoriesFilter = {some: {OR: categoriesMapping}}

			console.log(categoriesId);
			console.log(tags);

			const articles = await prisma.post.findMany({
				where: (categoriesId || tags) ? {
					categories: categoriesFilter,
					tags: tags ? {hasSome: tags} : undefined
				} : undefined,
				take: per_page,
				skip: per_page ? per_page * (page - 1)  : 0,
				include: {
					categories: {
						select: {category: true}
					}
				},
				orderBy: {dateCreated: "desc"}
			})

			const count = await prisma.post.count({
				where: (categoriesId || tags) ? {
					categories: categoriesFilter,
					tags: tags ? {hasSome: tags} : undefined
				} : undefined,
			})

			c.header('X-WP-Total', String(count))
			c.header("X-WP-TotalPages", String(Math.floor(count / (per_page ?? 1) + 0.5)))
			return c.json(articles, 200);
		}

		let post;

		//check if it is searched byId or bySlug
		if (isNaN(Number(idOrSlug))) {
			post = await prisma.post.findUnique({
				where: {
					slug: idOrSlug,
				},
				include: {
					categories: {
						select: {category: true}
					}
				},
			});
		} else {
			post = await prisma.post.findUnique({
				where: {
					id: Number(idOrSlug),
				},
				include: {
					categories: {
						select: {category: true}
					}
				},
			});
		}

		if (!post)
			throw Error("Not found")
		return c.json(post);
	} catch (e) {
		console.error(e)
		return c.json({message: (e as Error).message}, 500);
	}
}
