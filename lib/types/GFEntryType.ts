import { Document } from "../../generated/prisma/client";

export type GFEntryType = {
	formId: string;
	dateCreated: string;
	dateUpdated: string;
	isRead: boolean;
	email: string | undefined;
	salesforceId: string | undefined;
	files: Document[];
}
