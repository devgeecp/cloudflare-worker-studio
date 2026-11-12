-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Contenuti',
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "metaDescription" TEXT DEFAULT '',
    "metaTitle" TEXT DEFAULT '',
    "tags" TEXT[],
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "follow" BOOLEAN DEFAULT true,
    "featuredMedia" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "parentId" INTEGER,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnPosts" (
    "postId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "CategoriesOnPosts_pkey" PRIMARY KEY ("postId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE INDEX "posts_id_idx" ON "posts"("id");

-- CreateIndex
CREATE INDEX "posts_slug_idx" ON "posts"("slug");

-- CreateIndex
CREATE INDEX "CategoriesOnPosts_postId_idx" ON "CategoriesOnPosts"("postId");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
