import Link from "next/link";

import Grid from "@/components/Layout/Grid";
import Pagination from "@/components/elements/Pagination";
import Thumbnail from "@/components/elements/Thumbnail";
// import { formatDate } from "@/utils/utils";

import { ALL_CATEGORY, getPaginatedWorkPosts } from "../../_data/work-post";

export default async function WorkGroup({
  page = 1,
  limit = 15,
  category = ALL_CATEGORY,
}: {
  page?: number;
  limit?: number;
  category?: string;
}) {
  // get paginated posts (filtered by category)
  const paginationResult = await getPaginatedWorkPosts({
    page,
    limit,
    category,
  });

  const { posts, total, totalPages } = paginationResult;

  return (
    <>
      <Pagination
        page={page}
        total={total}
        totalPages={totalPages}
        className="mb-8 block sm:hidden"
        category={category}
      />

      <Grid className="mb-4">
        {posts.map(
          ({
            slug,
            data: {
              // title,
              // date,
              thumbnail,
            },
          }) => (
            <div key={`work-post-${slug}`} className="square">
              <Link
                href={`/work/post/${slug}?category=${category}`}
                className="content relative"
              >
                <Thumbnail
                  alt="Preview Thumbnail"
                  image={thumbnail}
                  shouldFill
                  sizes={Grid.SIZES}
                />

                {/* FIXME: */}
                {/* <div className="hidden">
                <span className="underline group-hover:no-underline">
                  {title}
                </span>
                <span className="ml-2 text-xs italic text-gray-500 group-hover:text-gray-300">
                  {formatDate(date)}
                </span>
              </div> */}
              </Link>
            </div>
          ),
        )}
      </Grid>

      <Pagination
        page={page}
        total={total}
        totalPages={totalPages}
        className="mt-8"
        category={category}
      />
    </>
  );
}
