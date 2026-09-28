
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client"
import type { Context } from "hono";

export function prismaConnection(c: Context) {


		const connectionString = `${c.env.HYPERDRIVE.connectionString}`

		const adapter = new PrismaPg({ connectionString });
		const prisma = new PrismaClient({ adapter });

		return prisma;
}
