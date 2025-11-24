import ArrowLink from "@/components/elements/ArrowLink";
import Thumbnail from "@/components/elements/Thumbnail";
import { formatDate } from "@/utils/utils";

import { getAllWorkPosts } from "../../_data/posts";

export default async function WorkGroup() {
  // client work:
  const workPosts = await getAllWorkPosts();

  return workPosts.map(({ title, slug, date, thumbnail }) => (
    <div key={`work-post-${slug}`} className="mb-2">
      <ArrowLink href={`/work/${slug}`}>
        <div className="inline-block mr-2 align-middle">
          <Thumbnail
            alt="Preview Thumbnail"
            image={thumbnail}
            width={48}
            height={48}
          />
        </div>
        <span className="underline group-hover:no-underline">{title}</span>
        <span className="ml-2 text-xs italic text-gray-500 group-hover:text-gray-300">
          {formatDate(date)}
        </span>
      </ArrowLink>
    </div>
  ));
}
