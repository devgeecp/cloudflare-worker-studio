/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from 'hono';
import { cors } from "hono/cors";
import importPost  from "../routes/api/post/importPost"
import importCategories from "../routes/api/post/importCategories"
import postArticle from "../routes/api/post/postArticle"
import editArticle from "../routes/api/post/editArticle"
import getArticles from "../routes/api/get/getArticles"
import deleteArticle from "../routes/api/delete/deleteArticle"
import getCategories from '../routes/api/get/getCategories';

export interface Env {
	HYPERDRIVE: Hyperdrive;
}
			const app = new Hono<{Bindings: CloudflareBindings, Variables: any}>();

			//cors with dynamic origin
			//TODO cambiare il default in produzione
			//TODO levare wildcard *

			app.use(
			  '/api/*',
			  cors({
			    origin: ["https://rimborso.eu","https://www.rimborso.eu","https://gestionecreditipubblici.it","http://localhost:3000", "https://dbapi.studiolegalefrisani.com", "http://localhost:8787",],
			    allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Set-Cookie", "Cookie"],
			    allowMethods: ['POST', 'GET', 'OPTIONS'],
			    exposeHeaders: ['Content-Length', 'X-Kuma-Revision', 'set-auth-token', "set-cookie"],
			    maxAge: 600,
			    credentials: true,
			  })
			)

			app.on(['GET', 'POST'],'/api/auth/*', (c) => {
				return auth(createDb(c)).handler(c.req.raw)
			})



			/** GET all posts / post by id / post by slug */
			app.get("/api/articles/:id-slug?", getArticles);

			app.get("/api/categories", getCategories);

			/** POST import array/list of articles (look at schema.prisma) */
			app.post("/api/import/post", importPost);

			/** POST a single article */
			app.post("/api/article", postArticle);

			/** EDIT a single article */
			app.post("/api/article/:id-slug", editArticle);

			/** DELETE an article */
			app.post("/api/article/delete/:id", deleteArticle);

			/** POST import array/list of categories (look schema.prisma) */
			app.post("/api/import/categories", importCategories);

			//app.get("/api/users", getUsers);

			export default app;
