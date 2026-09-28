import type { Context } from "hono";
import type { ArticleType } from "../../../lib/types/ArticleType"
import { prismaConnection } from "../../../lib/utils/prismaConnection"

const postArticle = async (_c: Context) => {	
				const body: ({article: ArticleType, pw: string}) = await _c.req.json();
				
				//check if request is authorized
				const dbpw = _c.env.DB_PASSWORD;
				if (body.pw != dbpw)
					return _c.json({error: "Access Denied", status: 500});

				const categoriesConnection = 
						body.article.categories.map(({id}) => {
						return {
							category: {connect: {id: id}}
						}
					})

				//post article
				try {
					const prisma = prismaConnection(_c);

					//create method prisma
					await prisma.post.create({
						data: {
							...body.article,
							categories: {
								create: categoriesConnection
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
