import type { Context } from "hono";
import type { ArticleType } from "../../../lib/types/ArticleType"
import { prismaConnection } from "../../../lib/utils/prismaConnection"

const importPost = async (_c: Context) => {
				const body: ({articles: ArticleType[], pw: string}) = await _c.req.json();
				const dbpw = _c.env.DB_PASSWORD;

				if (body.pw !== dbpw)
					return _c.json({error: "Access Denied", status: 500});
				//Import posts
				try {
					const prisma = prismaConnection(_c);
				//	await prisma.post.deleteMany({});
					await Promise.all(body.articles.map(async (article) => {

						if (!article.slug)
							return;
						const categoriesConnection =
								article.categories.map(({category: {id}}) => {
								return {
									category: {connect: {id: id}}
								}
							})

							await prisma.post.upsert({
							where: {slug: article.slug},
							//if article already exists, we just update it
							update: {
								...article,
								categories: undefined
							},
							// Article comes already parsed, so we pass it as it is
							create: {
								...article,
								// we need to connect every post with its categories due to many to
								// many relation, syntax is confusing, but we are creating a join table (CategoriesOnPost) that's why we use create with connect
								categories: {
									create: categoriesConnection
								}
							}
						});
					}))

					return _c.json({message: "Posts imported"}, 200);
				//Error handling
				} catch (e) {
						console.log(e);
					return _c.json({message: `Error: ${(e as Error).message}`}, 500);
				}
			}

export default importPost;
