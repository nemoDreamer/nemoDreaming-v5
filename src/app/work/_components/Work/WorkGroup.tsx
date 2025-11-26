import Link from "next/link";

import Grid from "@/components/Layout/Grid";
import Thumbnail from "@/components/elements/Thumbnail";
import { formatDate } from "@/utils/utils";

import { getAllWorkPosts } from "../../_data/posts";

export default async function WorkGroup() {
  // client work:
  const workPosts = await getAllWorkPosts();

  return (
    <Grid className="mb-4">
      {workPosts.map(({ title, slug, date, thumbnail }) => (
        <div key={`work-post-${slug}`} className="square">
          <Link href={`/work/${slug}`} className="content relative">
            <Thumbnail
              alt="Preview Thumbnail"
              image={thumbnail}
              shouldFill
              sizes={Grid.SIZES}
            />

            {/* FIXME: */}

            <div className="hidden">
              <span className="underline group-hover:no-underline">
                {title}
              </span>
              <span className="ml-2 text-xs italic text-gray-500 group-hover:text-gray-300">
                {formatDate(date)}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </Grid>
  );
}
