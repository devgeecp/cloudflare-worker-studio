
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client"
import { PrismaClient as PrismaClientSupabase } from "../../generated/prisma-supabase/client"
import type { Context } from "hono";
import { DefaultArgs } from "@prisma/client/runtime/client";
import { GlobalOmitConfig } from "../../generated/prisma/internal/prismaNamespace";

export function prismaConnection(c: Context) {

		const connectionString = `${c.env.HYPERDRIVE.connectionString}`

		const adapter = new PrismaPg({ connectionString });
		const prisma = new PrismaClient({ adapter });

		return prisma;
}

function prismaConnectionSupabase(c: Context) {
		const connectionString = `${c.env.SUPABASE_DB_URL}`

		const adapter = new PrismaPg({ connectionString });
		const prisma = new PrismaClientSupabase({ adapter });

		console.log("Switched to Supabase (remote) client");
		return prisma
}

export async function choosePrismaConnection(c: Context) {

	try {
		const prismaLocal = prismaConnection(c);
		const testQuery = await prismaLocal.post.findFirstOrThrow();
		console.log(testQuery);

		//Type Casting is necessary because compiler does not know if PrismaClient or PrismaClientSupabase
		return prismaLocal as PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs>;

	} catch (e) {
		console.error('ERRORE CONNESSIONE SERVER LOCALE: ', e);
		const prismaRemote = prismaConnectionSupabase(c);
		const testQuery = await prismaRemote.post.findFirstOrThrow();
		console.log(testQuery);
		return prismaRemote as PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs>;
	}
}
