
export interface ArticleType {
	id: number,
	dateCreated: Date,
	dateUpdated: Date,
	slug: string,
	//status can assume only "publish" | "draft" as values
	status: string,
	title: string,
	content: string,
	excerpt: string,
	author: string,
	categories: {category: CategoryType}[],
	tags: string[],
	featuredMedia: string | null
}


export interface CategoryType {
	id: number,
	name: string,
	parent?: CategoryType,
	parentId?: number,
	children: CategoryType[],
	posts: ArticleType[]
}
