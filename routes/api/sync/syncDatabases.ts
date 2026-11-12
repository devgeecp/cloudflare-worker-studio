
import type { Context } from "hono";
import { PrismaPg } from "@prisma/adapter-pg";
import { Post, PrismaClient } from "../../../generated/prisma/client";
import { Post as PostSupabase, PrismaClient as PrismaClientSupabase} from "../../../generated/prisma-supabase/client";

const MAX_REMOTE_ARTICLES = 50;
type Env = any

export default async function syncDatabasesRoute(c: Context) {
	try {
		await syncDatabases(c.env);
		return (c.json({message: "Databases Synced"}, 200))
	} catch (e) {
		console.error('Failed Database Sync')
		return (c.json({message: (e as Error).message}, 500))
	}
}

export async function syncDatabases(env: Env) {
		const {localDb, remoteDb} = getDbConnections(env);

		await syncCategories(env);
		const localArticles = await localDb.post.findMany({
			orderBy: {
				dateCreated: 'desc'
			}
		});

		const remoteArticles = await remoteDb.post.findMany({
			orderBy: {
				dateCreated: 'desc'
			}
		});

		for (let i = 0; i < MAX_REMOTE_ARTICLES; i++) {
			if (!remoteArticles.find(el => compareArticles(el, localArticles[i]))) {
				await syncSinglePost(localArticles, i, env);
			}	
		}

		const deletedFromBackup = cleanBackupDb(remoteArticles, remoteDb);
		await syncCategoriesPostRelation(env);

		console.log(`Local length: `, await localDb.post.count())
		console.log('DELETED FROM BACKUP: ', await deletedFromBackup)
		console.log(`REMOTE LENGTH: `, await remoteDb.post.count());
		console.log(`REMOTE LAST: `, remoteArticles[0].title);
}

function getDbConnections(env: Env) {

		const connectionStringLocal = `${env.HYPERDRIVE.connectionString}`
		const connectionStringSupabase = `${env.SUPABASE_DB_URL}`

		const adapterLocal = new PrismaPg({ connectionString: connectionStringLocal });
		const localDb = new PrismaClient({ adapter: adapterLocal });

		const adapterSupabase = new PrismaPg({ connectionString: connectionStringSupabase});
		const remoteDb = new PrismaClientSupabase({ adapter: adapterSupabase });

		return {localDb, remoteDb}

}

async function syncSinglePost(localArticles: Post[], index: number, env: Env) {

				const {remoteDb} = getDbConnections(env);

				const res = await remoteDb.post.upsert({where: {slug: localArticles[index].slug}, update: {...localArticles[index]}, create: {...localArticles[index]}});
				console.log(`DB RESPONSE:`, res);
}

async function cleanBackupDb(remoteArticles: PostSupabase[], remoteDb: PrismaClientSupabase) {

		const deletedFromBackup = []
		while (remoteArticles.length > MAX_REMOTE_ARTICLES)
		{
			const toDelete = remoteArticles.pop();
			deletedFromBackup.push(toDelete?.slug)
			await remoteDb.post.delete({
				where: {id: toDelete?.id}
			})
		}

		return deletedFromBackup;
}

function compareArticles(remoteArticle: PostSupabase, localArticle: Post) {


	return (
		remoteArticle.slug === localArticle.slug &&
		remoteArticle.title === localArticle.title &&
		remoteArticle.content === localArticle.content &&
		remoteArticle.tags.toString() === localArticle.tags.toString() &&
		remoteArticle.thumbnail === localArticle.thumbnail &&
		remoteArticle.featuredMedia === localArticle.featuredMedia
	)
}



async function syncCategories(env: Env) {
		const {localDb, remoteDb} = getDbConnections(env);

		const localCategories = await localDb.category.findMany({});
		await Promise.all(localCategories.map(async (localCat) => {
				const promise = await remoteDb.category.upsert({where: {id: localCat.id}, update: {...localCat}, create: {...localCat}})
				return promise
		}))

}

//sync relations only for articles on remoteDatabase, hence the filter
async function syncCategoriesPostRelation( env: Env ) {

		const {localDb, remoteDb} = getDbConnections(env);

		const remoteArticles = await remoteDb.post.findMany();
		const localCategoriesOnPost = await localDb.categoriesOnPosts.findMany({});

		//Await for all remote articles
		await Promise.all(remoteArticles.map(async (remoteArt) => {
			const localArtRelations = localCategoriesOnPost.filter(lRel => lRel.postId === remoteArt.id);
			//Await relation  by relation
			const promises = await Promise.all(localArtRelations.map(async (localRel) => {
					const promise = await remoteDb.categoriesOnPosts.upsert({where: {postId_categoryId: {
							postId: remoteArt.id,
							categoryId: localRel.categoryId
						}
					}, update: {...localRel}, create: {...localRel}})
					return promise
				})
			)
			return promises
		}))
		console.log(`Category <-> Post RELATIONS: ${await remoteDb.categoriesOnPosts.count()}`)
		console.log(`* Remember that one article has multiple categories so Relations should be > ${MAX_REMOTE_ARTICLES}`)
}
