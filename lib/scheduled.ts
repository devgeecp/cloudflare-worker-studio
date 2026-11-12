
import { ExecutionContext } from "hono";
import { ScheduledController } from "@cloudflare/workers-types";
import { syncDatabases } from "../routes/api/sync/syncDatabases"

interface Env {}
export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	) {
		// Write code for updating your API
		switch (controller.cron) {
			case "* */12 * * *":
				// Every twelve hours
				await syncDatabases(env);
				break;
			case "*/10 * * * *":
				// Every ten minutes
				break;
			case "*/45 * * * *":
				// Every forty-five minutes
				break;
		}
		console.log("cron processed");
	},
};
