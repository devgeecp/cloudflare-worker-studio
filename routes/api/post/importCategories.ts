import type { Context } from "hono";
import { prismaConnection } from "../../../lib/utils/prismaConnection"
import { CategoryType } from "../../../lib/types/ArticleType"

const importCategories= async (_c: Context) => {
				const body: ({categories: CategoryType[], pw: string}) = await _c.req.json();

				//check that request comes with a password
				const dbpw = _c.env.DB_PASSWORD

				if (body.pw !== dbpw)
					return _c.json({error: "Access Denied", status: 500});

				//Import posts
				try {
					const prisma = prismaConnection(_c);

					// upsert array/list of categories coming from request
					const newCatNoParents =  body.categories.filter((el) => {
						return !el.parentId;
					});

					const newCatParents =  body.categories.filter((el) => {
						return el.parentId;
					});


					await Promise.all(newCatNoParents.map(async (category) => {
						await prisma.category.upsert({
							where: {id: category.id || -1},
							update: {
								name: category.name,
								parentId: category.parentId != 0 ? category.parentId : null
							},
							create: {
								id: category.id ? category.id : undefined,
								name: category.name,
								parentId: category.parentId != 0 ? category.parentId : undefined
							}
						});
					}))


					await Promise.all(newCatParents.map(async (category) => {
						await prisma.category.upsert({
							where: {id: category.id || -1},
							update: {
								name: category.name,
								parentId: category.parentId != 0 ? category.parentId : null
							},
							create: {
								id: category.id ? category.id : undefined,
								name: category.name,
								parentId: category.parentId != 0 ? category.parentId : undefined
							}
						});
					}))

					return _c.json({message: "Categories imported"}, 200);
				//Error handling
				} catch (e) {
					return _c.json({message: `Error: ${(e as Error).message}`}, 500);
				}
			}

export default importCategories;
