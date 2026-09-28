import {  PrismaClient } from "../../../../generated/prisma/client";
import { GFEntryType } from "../../../../lib/types/GFEntryType"
//import jsforce from "jsforce"


export async function parseGFEntry(entry: any, prisma: PrismaClient): Promise<GFEntryType| undefined> {


	//isolate _labels === {"1" : "name", "2": "email", ecc...}
	const labels = entry["_labels"] as Object;
		const email = getField(entry, labels, "email");
		const salesforceId = getField(entry, labels, "id salesforce");
		const files = await getFiles(entry, labels, prisma, email, salesforceId);

		if (!files)
			return;

		return {
			formId: entry["form_id"],
			isRead: entry["is_read"],
			dateCreated: entry["date_created"],
			dateUpdated: entry["date_updated"],
			email,
			salesforceId,
			files
		}
	}

	async function getFiles(entry: any, labels: Object, prisma: PrismaClient, email: string | undefined, salesforceId: string | undefined) {

		let files: any[] = [];
		let ownerId: string | undefined;

		if (email) {
			let user = await prisma.user.findUnique({where: {email: email}});
			ownerId = user ? user.id : "";
			if (!ownerId) {
				console.error(`Found file without owner, in entry ${entry.id}`);
				return;
			}
		}


		/*
		 * Documents where uploaded with different methods:
		 * - By GravityForm file upload field -> filepath === string
		 * - By GravityForm with multiple file upload -> filepath(s) === string[]
		 * - By Salesforce: retrieve infos by query with jsforce
		 * */

		//Determine if upload was made with GF by looking up if there is a mail
		if (email) {

			//Iterate entry fields: fields could be numeral strings for custom ones, or strings
			Object.entries(entry).forEach(([field, value]) => {

				//Replace wordpress prefix with localdb url
				const toReplace = "https://www.difendimi.com/wp-content/uploads/gravity_forms/";
				const replacement = "https://wsrimb.studiolegalefrisani.com/documents/";

				//if !Array then is singlefile
				if (!Array.isArray(value) && String(value).search(toReplace) >= 0)
				{
					const file = makeFileObject(value, toReplace, replacement, field, labels, entry, ownerId as string);
					if (file)
						files.push(file);
				}

				//When Array
				else if (Array.isArray(value) && String(value[0]).search(toReplace) >= 0) {
					value.forEach(
						(path) => {
							const file = makeFileObject(path, toReplace, replacement, field, labels, entry, ownerId as string);
							if (file)
								files.push(file);
						})
				}
			})
		} else {
			return
		}

		//When uploaded by Salesforce
		//else if (salesforceId) {
		//	const conn = new jsforce.Connection({
		//		loginUrl: process.env.SF_LOGIN_URL || 'https://login.salesforce.com',
		//	});

		//	await conn.login(
		//		process.env.SF_USERNAME as string,
		//		`${process.env.SF_PASSWORD as string}${process.env.SF_TOKEN as string}`
		//	);

		//}

		return files;

	}


		function makeFileObject(value: any, toReplace: string, replacement: string, field: string, labels: any, entry: any, ownerId: string) {
			const parsPath = (value as string).replaceAll(toReplace, replacement);
			const filetypeId = Object.entries(labels).find(([key]) => field === key );
			if (!filetypeId || ! filetypeId[0])
			{
				console.error(`Found file without doc type, in entry ${entry.id}`);
				return;
			}

			return({
				path: parsPath,
				ownerId,
				dateUpdated: entry["date_updated"],
				dateCreated: entry["date_created"],
				formId: entry["form_id"],
				filetypeId: filetypeId[0],
				filetypeName: filetypeId[1],
			})
		}

	function getField(entry: any, labels: Object, needle: string) {

		let email: string | undefined;
		Object.entries(labels).forEach(([key, value]) => {
			if (typeof value !== "string")
				return;
			const val = (value as string).toLowerCase();
			if (val === needle)
				email = entry[key]
	})

	return email;
}
