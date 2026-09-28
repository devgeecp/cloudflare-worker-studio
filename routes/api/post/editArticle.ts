import type { Context } from "hono";
import type { ArticleType } from "../../../lib/types/ArticleType"
import { prismaConnection } from "../../../lib/utils/prismaConnection"


interface PayloadArticle extends Omit<ArticleType, "categories"> {
	categories: {id: number, name?: string, parentId?: number}[];
}

const postArticle = async (_c: Context) => {
				const body: ({article: PayloadArticle, pw: string}) = await _c.req.json();

				//check if request is authorized
				const categoriesConnection =
						body.article.categories.map(({id}) => {
						return {
							where: {
								postId_categoryId: {
									categoryId: id,
									postId: body.article.id
								}
							},
							data: {
								category: {connect: {id: id}}
							}
						}
					})

				//post article
				try {

					const dbpw = _c.env.DB_PASSWORD
					if (body.pw != dbpw)
						throw Error("Access Denied");


					const prisma = prismaConnection(_c);

					//create method prisma
					await prisma.post.update({
						where: {id: body.article.id},
						data: {
							...body.article,
							categories: {
								update: categoriesConnection
							}
						}
					});

					return _c.json({message: "article added to database"}, 200);
				//Error handling
				} catch (e) {
					return _c.json({message: `Error: ${(e as Error).message}`}, 500);
				}

			}

export default postArticle;
