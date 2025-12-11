import Link from "next/link";

import Grid from "@/components/Layout/Grid";
import Pagination from "@/components/elements/Pagination";
import Thumbnail from "@/components/elements/Thumbnail";
import { formatDate } from "@/utils/utils";

import { getPaginatedPosts } from "../../_data/work-post";

export default async function WorkGroup({ page = 1 }: { page?: number }) {
  // client work with pagination:
  const { posts, total, totalPages } = await getPaginatedPosts({
    page,
    limit: 15,
  });

  return (
    <>
      <Pagination
        page={page}
        total={total}
        totalPages={totalPages}
        className="mb-8 block sm:hidden"
      />

      <Grid className="mb-4">
        {posts.map(({ slug, data: { title, date, thumbnail } }) => (
          <div key={`work-post-${slug}`} className="square">
            <Link href={`/work/post/${slug}`} className="content relative">
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
        ))}
      </Grid>

      <Pagination
        page={page}
        total={total}
        totalPages={totalPages}
        className="mt-8"
      />
    </>
  );
}
