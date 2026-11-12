-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "metaDescription" TEXT DEFAULT '',
ADD COLUMN     "metaTitle" TEXT DEFAULT '';

-- CreateIndex
CREATE INDEX "CategoriesOnPosts_postId_idx" ON "CategoriesOnPosts"("postId");

-- CreateIndex
CREATE INDEX "posts_id_idx" ON "posts"("id");

-- CreateIndex
CREATE INDEX "posts_slug_idx" ON "posts"("slug");
